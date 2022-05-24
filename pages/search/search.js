// pages/search/search.js
let util = require('../../utils/util.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        loading:false
    },
    search(event) {
        this.setData({
            books: [],
        })
        const {
            value
        } = event.detail
        this.setData({
            loading:true
        })
        wx.cloud.callFunction({
            name: 'search',
            data: {
                content: value,
                type:'books'
            }
        }).then((res) => {
            console.log(res);
            let that = this
            const {
                result
            } = res;
            let {
                books,contents
            } = result;
            if (!books) {
                wx.showToast({
                    title: '暂无相关信息',
                    icon: 'none',
                    duration: 1500
                })
            }
            util.loadScreen(that)
            this.setData({
                books
            })
            console.log(contents)
        })
    },
    goBook(e) {
        wx.navigateTo({
            url: '../details/details?title=' + e.currentTarget.dataset.name
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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