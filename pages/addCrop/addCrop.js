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
        // this.loadBooks(this.data.books.length)
    },
    /**
     * 生命周期函数--监听页面显示
     * 显示调用loadbooks加载函数
     */
    onShow: function () {
        // 显示后重新加载
        console.log("----------------")
        this.setData({
            books: []
        })
        this.loadBooks(this.data.books.length)
        // this.loadBooks(0)
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
    loadBooks: function (n) {
        let openid = wx.getStorageSync('openid')
        // 判断是否登录
        if (openid) {
            // 收藏接口
            wx.cloud.database().collection('collects').where({
                    _openid: openid
                }).get()
                .then(res => {
                    let arr = res.data
                    console.log("arr",arr)
                    console.log(arr.length)
                    // 百科接口
                    wx.cloud.database().collection('books').skip(n).limit(7).get().then(res => {
                        let books = res.data
                        console.log("books", books)
                        console.log(books.length)
                        // 筛选用户是否收藏
                        books.forEach(item => {
                            for (let i = 0; i < arr.length; i++) {
                                console.log(item.title, arr[i].title)
                                if (item.title === arr[i].title) {
                                    item.isCollect = true
                                }
                            }
                        })
                        // 合并数组
                        this.setData({
                            books: this.data.books.concat(books)
                        })
                        console.log("现在数据总数",this.data.books.length)
                    })
                })

        } else {
            wx.showToast({
                title: '未登录',
                icon: 'none',
                duration: 1500
            })
            // 未登录无需筛选
            wx.cloud.database().collection('books').skip(n).limit(6).get().then(res => {
                console.log(res.data)
                this.setData({
                    books: this.data.books.concat(res.data)
                })
            })
        }

    },
     /**
     * 添加收藏函数
     * 1. 判断登录
     * 2. 寻找收藏目标下标
     * 3. 调用添加接口为数据库添加收藏数据
     */
    addCollect: function (e) {
        let openid = wx.getStorageSync('openid')
        if (openid) {
            let item = e.currentTarget.dataset.item
            let index = this.data.books.findIndex(collect => collect.title === item.title)
            this.setData({
                ['books[' + index + '].isCollect']: true
            })
            console.log(this.data.books[index].isCollect)
            wx.cloud.database().collection('collects').add({
                data: {
                    title: item.title,
                    intro: item.intro,
                    img: item.img,
                    isCollect: true,
                    cId: item._id,
                },
                success: res => {
                    console.log(res)
                },
                fail: err => {
                    console.log(err)
                }
            })
        } else {
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 1500
            })
        }
    },
     /**
     * 移除收藏函数
     * 调用移除收藏接口
     * where：根据特定的键值对来对数据进行删除
     */
    removeCollect(e) {
        let collect = e.currentTarget.dataset.item
        let openid = wx.getStorageSync('openid')
        wx.cloud.database().collection('collects').where({
            _openid: openid,
            title: collect.title
        }).remove({
            success: res => {
                console.log(res)
                wx.showToast({
                    title: '取消收藏成功',
                })
                // 样式控制
                let index = this.data.books.findIndex(item => item.title === collect.title)
                this.setData({
                    ['books[' + index + '].isCollect']: false
                })
            }
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
        let openid = wx.getStorageSync('openid')
        // 登录判断
        if (openid) {
            // 用户收藏接口
            wx.cloud.database().collection('collects').where({
                    _openid: openid
                }).get()
                .then(res => {
                    let arr = res.data
                    console.log(arr)
                    // 刷新页面，从0开始获取，并直接覆盖原来数组
                    wx.cloud.database().collection('books').skip(0).limit(6).get().then(res => {
                        let books = res.data
                        console.log(books, arr)
                        books.forEach(item => {
                            for (let i = 0; i < arr.length; i++) {
                                console.log(item.title, arr[i].title)
                                if (item.title === arr[i].title) {
                                    item.isCollect = true
                                }
                            }
                        })
                        this.setData({
                            books: books
                        })
                        wx.hideLoading();
                        //隐藏导航条加载动画
                        wx.hideNavigationBarLoading();
                        //停止下拉刷新
                        wx.stopPullDownRefresh();
                    })
                })
        } else {
            wx.showToast({
                title: '未登录',
                icon: 'none',
                duration: 1500
            })
            wx.cloud.database().collection('books').skip(n).limit(6).get().then(res => {
                console.log(res.data)
                this.setData({
                    books: this.data.books.concat(res.data)
                })
            })
        }
    },
})