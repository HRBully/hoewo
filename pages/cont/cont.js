// pages/cont/cont.js
let util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true
    },
    getcontent() {
        let {
            title,
            chapter
        } = this.data
        wx.cloud.database().collection('contents').where({
            title,
            chapter
        }).get().then(res => {
            console.log(res)
            this.setData({
                content: res.data[0].content
            })
            this.selectComponent('#preContent').build();
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {
            title,
            chapter
        } = options
        this.setData({
            title,
            chapter
        })
        this.getcontent()
        let that = this
        util.loadScreen(that, 1000)
        util.setSeason(that)
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