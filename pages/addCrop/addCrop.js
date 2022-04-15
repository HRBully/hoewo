// pages/addCrop/addCrop.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        isLoader: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadBooks(this.data.books.length)
    },
    loadBooks: function (n) {
        wx.cloud.database().collection('books').skip(n).limit(6).get().then(res => {
            console.log(res.data)
            this.setData({
                books: this.data.books.concat(res.data)
            })
        })
    },
    onReachBottom: function () {
        this.setData({
            isLoader: true
        })
        this.loadBooks(this.data.books.length)
        setTimeout(() => {
            this.setData({
                isLoader: false
            })
        }, 1000);
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log(1)
        //在标题栏中显示加载
        wx.showNavigationBarLoading() 
        wx.showLoading({
            title: '刷新中...',
        })
        wx.cloud.database().collection('books').skip(0).limit(6).get().then(res => {
            this.setData({
                books: res.data
            })
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        })
    },
})