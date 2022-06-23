let util = require('../../utils/util.js')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        isLoader: false,
        loading: true,
        hidden:true,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBooks(this.data.books.length)
        var that =this;
        util.loadScreen(that,1500)
    },
    /**
     * 生命周期函数--监听页面显示
     * 显示调用getbooks加载函数
     */
    onShow: function () {
        this.changeIcon()   
    },
    // 详情路由跳转
    goBook(e) {
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '../details/details?id=' + e.currentTarget.dataset.id + '&title=' + e.currentTarget.dataset.name
        })
    },
    /**
    * 加载函数--加载百科数据
    * 1. 调用获取用户收藏接口，拿到用户收藏数据
    * 2. 调用获取百科数据，从n开始，长度为6
    * skip(n)：从数据库的第n项开始
    * limit(6)：获取6项
    * 3. 筛选百科获取的数组内包含用户所收藏的数据，来控制收藏样式
    * 4. 合并数组
    */
    /**
     * deBug: 首次加载数据不能过于少  数据高度未触底导致页面死掉，无法进行触底加载，数据充足的前提可以首次加载8-10个数据 当前：7
     * deBug: 页面加载跟onShow重复渲染 数据加倍， 取消页面加载渲染，用onshow来热更新数据，每次从零开始请求刷新数据
     * deBug：修复个人页取消收藏样式bug，跟这个页面之前一样
     */
    getBooks:function(n) {
        wx.showLoading({
            title: '加载中',
        })
        wx.cloud.database().collection('bookintro').skip(n).limit(8).get().then(res => {
            console.log(res.data)
            wx.hideLoading()
            this.setData({
                books: this.data.books.concat(res.data)
            })
            if(res.data.length === 0) {
                wx.showToast({
                  title: '已经到底了',
                  icon:"none"
                })
            }
        })
    },
     /**
    * 搜索路由函数
    */
    goSearch() {
        wx.navigateTo({
            url: '../search/search',
        })
    },
    /**
    * 生命周期函数--监听用户触底动作
    * 控制动画
    * 调用加载函数，以当前数据为基准进行数据获取
    */
    onReachBottom: function () {
        this.setData({
            isLoader: true
        })
        this.getBooks(this.data.books.length)
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
        //在标题栏中显示加载
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '刷新中...',
        })
        this.setData({
            books: []
        })
        wx.cloud.database().collection('bookintro').skip(this.data.books.length).limit(7).get().then(res => {
            console.log(res.data)
            wx.hideLoading()
            this.setData({
                books: this.data.books.concat(res.data)
            })
            wx.hideLoading();
            //隐藏导航条加载动画
            wx.hideNavigationBarLoading();
            //停止下拉刷新
            wx.stopPullDownRefresh();
        })
      
    },
    // 解决需要点击两次 tabbar 图标才会变换
    changeIcon() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            })
        }
    },
})