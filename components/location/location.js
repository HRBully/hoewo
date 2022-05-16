// components/location/location.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk')
var qqmapsdk = new QQMapWX({
    key: '5BKBZ-UQBEP-CX4DM-LCCZB-FPUTE-IEBJZ'
})
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
    },
    pageLifetimes: {
        show(){
            let userInfo = wx.getStorageSync('userInfo')
            if(userInfo) {
                this.getLocation()
            }
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
                            // 省 province 市 city 区 district 街道 street 最低级地址 street_number
                            let { city: location } = wx.getStorageSync('location')
                            wx.setStorageSync('city', location.split('市')[0])
                            let page = getCurrentPages().pop()
                            page.getWeather()
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
            let userInfo = wx.getStorageSync('userInfo')
            if(userInfo) {
                return
            } else {
                wx.getUserProfile({
                    desc: '用户完善会员资料',
                })
                    .then(res => {
                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 2000
                        })
                        this.getLocation()
                        wx.setStorageSync('userInfo', res.userInfo)
                        wx.cloud.callFunction({
                            name: 'login',
                        }).then(res => {
                            wx.setStorageSync('openid', res.result.openid)
                        })
                    })
                    .catch(err => {
                        console.log("用户拒绝了微信授权登录", err);
                    })
            }
            
        }
    }
})
