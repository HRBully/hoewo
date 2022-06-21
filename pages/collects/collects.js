// pages/collects/collects.js
let util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        let openid = wx.getStorageSync('openid')
        this.getCollects(openid)
       
    },
    getCollects(openid) {
        wx.cloud.database().collection('collects').where({
                _openid: openid
            }).get()
            .then(res => {
                this.setData({
                    collects: res.data
                })
                util.loadScreen(this, 1500)
                util.setSeason(this)
            })
    },
    goBook(e) {
        wx.cloud.database().collection('bookintro').where({
            title: e.currentTarget.dataset.name
        }).get().then(res => {
            wx.navigateTo({
                url: '../details/details?id=' + res.data[0]._id + '&title=' + e.currentTarget.dataset.name
            })
        })
        console.log(e.currentTarget.dataset.cId)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        let openid = wx.getStorageSync('openid')
        this.getCollects(openid)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})