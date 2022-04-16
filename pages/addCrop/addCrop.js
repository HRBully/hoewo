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
    onShow: function () {
        this.setData({
            books: []
        })
        this.loadBooks(this.data.books.length)
    },
    loadBooks: function (n) {
        let openid = wx.getStorageSync('openid')
        if (openid) {
            wx.cloud.database().collection('collects').where({
                    _openid: openid
                }).get()
                .then(res => {
                    let arr = res.data
                    console.log("arr",arr)
                    console.log(arr.length)
                    wx.cloud.database().collection('books').skip(n).limit(6).get().then(res => {
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
                            books: this.data.books.concat(books)
                        })
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
                let index = this.data.books.findIndex(item => item.title === collect.title)
                this.setData({
                    ['books[' + index + '].isCollect']: false
                })
            }
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
        let openid = wx.getStorageSync('openid')
        if (openid) {
            wx.cloud.database().collection('collects').where({
                    _openid: openid
                }).get()
                .then(res => {
                    let arr = res.data
                    console.log(arr)
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