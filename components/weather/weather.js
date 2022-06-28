// components/weather/weather.js 
let city = '北京'
let locationCom = require('../../request/location.js') 
let util = require('../../utils/util.js')
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
        wea_img: '', // 天气图标路径
        wea: '', // 天气
        tem: '', // 当前温度
        temH: '', // 最高温度
        temL: '', //最低温度
        win: '', //空气水平
        month: '', //月份
        day: 0, // 日期
        nextwea_img: '', // 明天天气图标路径
        nextwea: '', // 明天天气
        nexttem: '', // 明天当前温度
        nexttemH: '', // 明天最高温度
        nexttemL: '', //明天最低温度
        nextwin: '', //空气水平
        nextmonth: '', //月份
        nextday: 0 ,// 明天
        season:''
    },
    attached:function() {
        let that = this
        util.setSeason(that)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 跳转天气页面
        toWeather() {
            let userInfo = wx.getStorageSync('userInfo')
            if (userInfo) {
                wx.navigateTo({
                    url: '../../pages/weather/weather',
                })
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
                        // 存放个人信息
                        wx.setStorageSync('userInfo', res.userInfo)
                        locationCom.getLocation()
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

        },
        // 获取天气信息
        getNextWeather() {
            if (wx.getStorageSync('city')) {
                city = wx.getStorageSync('city')
            }
            wx.request({
                url: `https://v0.yiketianqi.com/free/week/api?unescape=1&version=v1&appid=44831462&appsecret=nyT7UNR2&city=${city}`,
                success: (res) => {
                    // 今日日期
                    let date = res.data.data[0].date
                    let dateArry = date.split('-')
                    let month = dateArry[1] * 1
                    let day = dateArry[2] * 1
                    // 明日日期
                    let nextdate = res.data.data[1].date
                    let nextdateArry = date.split('-')
                    let nextmonth = dateArry[1] * 1
                    let nextday = dateArry[2] * 1
                    let Nexttem = ( res.data.data[1].tem_day * 1 + res.data.data[1].tem_night * 1 ) / 2
                    let nexttem = Math.ceil(Nexttem) + '℃'
                    this.setData({
                        // 今日
                        month,
                        day,
                        // 明日
                        nextmonth,
                        nextday,
                        nexttem,
                        nextwea_img: `../../images/tianqi/${res.data.data[1].wea_img}.png`,
                        nextwea: res.data.data[1].wea,
                        nexttemH: res.data.data[1].tem_day + '℃',
                        nexttemL: res.data.data[1].tem_night + '℃',
                        // nextwin: res.data.data[1].win.join('/'),
                        nextwin: res.data.data[1].win
                    })
                }
            })
        },
        getLiveWeather() {
            if (wx.getStorageSync('city')) {
                city = wx.getStorageSync('city')
            }
            wx.request({
                url: `https://v0.yiketianqi.com/free/day/api?unescape=1&version=v1&appid=44831462&appsecret=nyT7UNR2&city=${city}`,
                //成功回调
                success: (res) => {
                    this.setData({
                        wea_img: `../../images/tianqi/${res.data.wea_img}.png`,
                        wea: res.data.wea,
                        tem: res.data.tem,
                        temH: res.data.tem_day,
                        temL: res.data.tem_night,
                        win: res.data.win,
                    })
                }
            })
        },
    },

    pageLifetimes: {
        show() {
            this.getLiveWeather()
            this.getNextWeather()
        }
    }
})