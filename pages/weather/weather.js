// 引入高德api
var amapFile = require('../../lib/amap-wx.js');
// pages/weather/weather.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当日天气
        liveData:{},
        // 天气预报
        forecast:{},
        // 星期转换表
        weekday:{
            1:"周一",
            2:"周二",
            3:"周三",
            4:"周四",
            5:"周五",
            6:"周六",
            7:"周日",
        },
        // 天气图片转换表
        tianqiImage:{
            "晴":"../../images/tianqi/qing.png",
            "多云":"../../images/tianqi/duoyun.png",
            "阴":"../../images/tianqi/yin.png",
            "沙尘暴":"../../images/tianqi/shachenbao.png",
            "冻雨":"../../images/tianqi/bingbao.png",
            "冰雹":"../../images/tianqi/bingbao.png",
            "浮尘":"../../images/tianqi/fuchen.png",
            "台风":"../../images/tianqi/taifeng.png",
            "小雪":"../../images/tianqi/xiaoxue.png",
            "中雪":"../../images/tianqi/zhongxue.png",
            "大雪":"../../images/tianqi/daxue.png",
            "雾":"../../images/tianqi/wu.png",
            "雾霾":"../../images/tianqi/wumai.png",
            "小雨":"../../images/tianqi/xiaoyu.png",
            "中雨":"../../images/tianqi/zhongyu.png",
            "大雨":"../../images/tianqi/dayu.png",
            "雷阵雨":"../../images/tianqi/leizhenyu.png",
            "雨夹雪":"../../images/tianqi/yujiaxue.png",
            "云":"../../images/tianqi/yun.png",
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var myAmapFun = new amapFile.AMapWX({key:'8a2664519056bb501bc81cc5caed1594'});
        myAmapFun.getWeather({
            success: function(data){
                //成功回调
                const {liveData} = data
                const date = liveData.reporttime
                liveData.liveDate = date.split(" ")[0]
                liveData.liveTime = date.split(" ")[1]
                liveData.weatherPic = that.data.tianqiImage[data.weather.data]
                that.setData({
                    liveData:liveData
                })
                console.log(liveData)
            },
            fail: function(info){
                //失败回调
                console.log(info)
            }
        })
        myAmapFun.getWeather({
            type:'forecast',
            success: function(data){
                //成功回调
                const {forecast} = data
                forecast.casts[0].date = "明天"
                forecast.casts[1].date = "后天"
                forecast.casts[2].date = that.data.weekday[forecast.casts[2].week]
                for(let i in forecast.casts){
                    forecast.casts[i].weatherPic = that.data.tianqiImage[forecast.casts[i].dayweather]
                }
                that.setData({
                    forecast:forecast
                })
            },
            fail: function(info){
                //失败回调
                console.log(info)
            }
        })
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