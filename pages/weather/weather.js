// pages/weather/weather.js
let util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 背景色浅
        bgc1: '#7fdc9f',
        // 背景色深
        bgc2: '#37cd69',
        // 当日天气
        liveData: {},
        // 天气预报
        forecast: [],
        loading: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        const app = getApp()
        this.getLiveWeather()
        this.getNextWeather()
        util.setSeason(that)
        util.loadScreen(that,1000)
        switch (app.globalData.season) {
            case 'spring':
                this.setData({
                    // 背景色浅
                    bgc1: '#7fdc9f',
                    // 背景色深
                    bgc2: '#37cd69',
                })
                break
            case 'autumn':
                this.setData({
                    // 背景色浅
                    bgc1: '#e4d1c6',
                    // 背景色深
                    bgc2: '#f3c6b4',
                })
                break
        }
    },
    /**
     * 获取当前天气
     */
    getLiveWeather() {
        wx.showToast({
            title: '正在加载...',
            icon: 'loading',
            duration: 2000000
        })
        wx.request({
            url: 'https://v0.yiketianqi.com/free/day/api?unescape=1&version=v1&appid=44831462&appsecret=nyT7UNR2',
            //成功回调
            success: (res) => {
                wx.hideToast();

                // 当前时间
                let date = new Date()
                let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
                let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
                let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
                let liveTime = `${hour}:${minutes}:${sec}`
                // 当前天气
                let liveData = {}
                liveData.city = res.data.city
                liveData.liveDate = res.data.date
                liveData.liveTime = liveTime
                liveData.temperature = res.data.tem
                liveData.weatherPic = `../../images/tianqi/${res.data.wea_img}.png`
                liveData.weather = res.data.wea
                liveData.humidity = res.data.humidity
                liveData.winddirection = res.data.win.split('风')[0]
                liveData.windpower = res.data.win_speed
                liveData.pressure = res.data.pressure
                this.setData({
                    liveData
                })
            },
            // 失败回调
            fail: (error) => {
                wx.hideToast();
                if (error) {
                    wx.showModal({
                        title: '请求失败',
                        content: "请不要多次重复请求，间隔一会儿再来试试吧~",
                        showCancel: false
                    });
                } else {
                    wx.showModal({
                        title: '请求超时',
                        content: '请检查网络设置',
                        showCancel: false
                    });
                }
            }
        })
    },
    /**
     * 获取天气预报
     */
    getNextWeather() {
        wx.showToast({
            title: '正在加载...',
            icon: 'loading',
            duration: 2000000
        })
        wx.request({
            url: 'https://yiketianqi.com/api?unescape=1&version=v1&appid=44831462&appsecret=nyT7UNR2',
            //成功回调
            success: (res) => {
                wx.hideToast();
                let forecast = []
                forecast = res.data.data
                forecast.splice(0, 1)
                forecast.forEach((item) => {
                    // 图片路径
                    item.weatherPic = `../../images/tianqi/${item.wea_img}.png`
                    // 白天气温
                    item.tem1 = item.tem1.split('℃')[0]
                    // 夜间气温
                    item.tem2 = item.tem2.split('℃')[0]
                })
                this.setData({
                    forecast
                })
            },
            // 失败回调
            fail: (error) => {
                wx.hideToast();
                if (error) {
                    wx.showModal({
                        title: '请求失败',
                        content: "请不要多次重复请求，间隔一会儿再来试试吧~",
                        showCancel: false
                    });
                } else {
                    wx.showModal({
                        title: '请求超时',
                        content: '请检查网络设置',
                        showCancel: false
                    });
                }
            }
        })
    },
    /**
     * 更新、刷新实时天气
     */
    onRefreshBtnClick() {
        this.getLiveWeather()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})