// pages/home/home.js
let year = 2022
// 下拉刷新次数
let account = 0
Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeColor: 'linear-gradient(to bottom , #72db95, #addec2)',// 主题（背景）颜色
        tabbarColor: '#37b565',// tabbar颜色
        month: 0,// 今月
        day: 0,// 今天
        remainTime: 0,// 剩余时间
        solarTerm: '夏至',// 节气
        verse: [],// 诗句
        selectFlag: true,// 控制文章类型边框样式
        consult: [],// 咨询信息
    },
    // 判断季节
    judgeSeason(month) {
        switch (true) {
            case month >= 3 && month <= 5:
                this.setData({
                    tabbarColor: '#fff'
                })
                break
        }
    },
    // 设置主题
    setTheme() {

    },
    // 获取节气信息
    getSolarTerm() {
        let date = new Date()
        let year = date.getFullYear()
        let day = date.getDate()
        let month = date.getMonth() + 1
        this.setData({
            day,
            month
        })
        day = day < 10 ? '0' + day : day
        month = month < 10 ? '0' + month : month
        let currentTime = year + '-' + month + '-' + day
        wx.cloud.callFunction({
            name: 'home',
            data: {
                currentTime,
                $url: 'getSolarTerm'
            },
            success: res => {
                // 获取数据库返回数据
                let data = res.result.data[0]
                let solarTerm = data.name
                let time = data.time.split('-')
                // 将季节存储到storage中
             
                // 将获取到的节气日期由字符串转数字,用于去0
                year = time[0]
                time[1] = Number.parseInt(time[1])
                time[2] = Number.parseInt(time[2])
                // 节气日期所在在今年天数
                let future = this.getRemainTime(time[1], time[2])
                // 今天所在在今年天数
                let current = this.getRemainTime(this.data.month, this.data.day)
                // 今天距离节气所在天数
                let remainTime = future - current
                // 将诗句转成数组
                let verse = data.verse.split('，')
                this.setData({
                    solarTerm,
                    verse,
                    remainTime
                })
            }
        })
    },
    // 日期在今年所在天数
    getRemainTime(month, day) {
        let date = 0
        switch (month - 1) {    // date 加的是上个月的 所有天数
            case 11:       //利用switch的 穿透性 自动累加前面的月份
                date += 30;
            case 10:
                date += 31;
            case 9:
                date += 30;
            case 8:
                date += 31;
            case 7:
                date += 31;
            case 6:
                date += 30;
            case 5:
                date += 31;
            case 4:
                date += 30;
            case 3:
                date += 31;
            case 2: if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                date += 29;
            } else {
                date += 28
            }  // 二月份 因为平年、闰年的原因需要判断 平年+28天， 闰年 + 29天 
            //闰年的判断规则： 四年一闰年，百年不闰年，四百年又是闰年
            case 1:
                date += 31;
                break;
        }
        date += day;
        return date
    },
    // 获取咨询信息
    getConsult() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'home',
            data: {
                account,
                $url: 'getConsult'
            },
            success: (res) => {
                account++
                this.setData({
                    consult: res.result.data
                })
                wx.hideLoading()
            }
        })
    },
    // 获取新闻信息
    getNews() {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.callFunction({
            name: 'home',
            data: {
                account,
                $url: 'getNews'
            },
            success: (res) => {
                account++
                this.setData({
                    consult: res.result.data
                })
                wx.hideLoading()
            }
        })
    },
    // 前往咨询列表
    toConsult() {
        this.setData({
            selectFlag: true
        })
        account = 0
        this.getConsult()
    },
    // 前往新闻列表
    toNews() {
        this.setData({
            selectFlag: false
        })
        account = 0
        this.getNews()
    },
    // 解决需要点击两次 tabbar 图标才会变换
    changeIcon() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSolarTerm()
        this.getConsult()
        this.judgeSeason(this.data.month)
        console.log(options.index);
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
        this.changeIcon()
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