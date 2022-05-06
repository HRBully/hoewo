// components/location/location.js


// 用户是否打开位置消息权限
var modal = true
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        location:'北京'
    },
    onLoad: function (options) {
        // this.getBooks(this.data.books.length)
        var QQMapWX = require('../../common/qqmap-wx-jssdk')
        var qqmapsdk = new QQMapWX({
            key: '5BKBZ-UQBEP-CX4DM-LCCZB-FPUTE-IEBJZ'
        })
    },
    pageLifetimes: {
        show(){
            // 判断用户登陆      
            wx.checkSession({
                success: (res) => {
                    this.getLocation()
                }
              })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 获取用户地址
        getLocation() {       
            if(!modal) return
            wx.getLocation({
                type: 'wgs84',
                success:(res) => {
                   let latitude = res.latitude
                   let longitude = res.longitude
                    qqmapsdk.reverseGeocoder({
                        location: {
                            latitude,
                            longitude
                        },
                        success: (res)=> {
                            wx.setStorageSync('location', res.result.address_component)
                            let { street: location } = wx.getStorageSync('location')
                            this.setData({
                                location
                            })
                        }

                    })
                },
                fail:(res) => {
                    wx.showModal({
                      cancelColor: 'cancelColor',
                      title: '未授权位置消息不能使用完整功能，是否前往授权',
                      success: (res) => {
                          if(res.confirm) {
                              wx.openSetting({
                                withSubscriptions: true,
                              })
                          } else {
                              wx.showModal({
                                cancelColor: 'cancelColor',
                                content: '再次进入小程序会再次询问哦'
                              })
                              modal = false
                          }
                      }

                    })
                }
               })
               
        },
        // 点击事件
        onClick() {
            console.log('111');
            wx.checkSession({
                fail: (res) => {
                    console.log('222');
                    wx.showLoading({
                      title: '登录中...',
                    })
                    wx.login({
                        success: (res) => {
                            wx.hideLoading()
                            this.getLocation()
                        }
                    })
                }
            })
        }

    }
})
