// pages/details/details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabCur: 0, //默认选中
        tabs: [{
            name: '介绍',
            id: 0
        },
        {
            name: '目录',
            id: 1
        },
        ],
        lists: [],
        isCollect: false,
        loading:true
    },
    getintro(title) {
        wx.cloud.database().collection('bookintro').where({
            title: title
        }).get().then(res => {
            console.log(res)
            this.setData({
                img: res.data[0].img,
                intro: res.data[0].intro,
                introduce: res.data[0]?.introduce,
                lists: res.data[0].section
            })
            this.selectComponent('#preIntroduce').build();
        })
        wx.cloud.database().collection('bookintro')
    },
    goCont(e) {
        wx.navigateTo({
            url: '../cont/cont?title=' + this.data.title + '&&chapter=' + e.currentTarget.dataset.chapter,
        })
    },
    /**
    * 添加收藏函数
    * 1. 判断登录
    * 2. 调用添加接口为数据库添加收藏数据
    */
    addCollect: function () {
        let openid = wx.getStorageSync('openid')
        if (openid) {
            wx.cloud.database().collection('collects').add({
                data: {
                    title: this.data.title,
                    intro: this.data.intro,
                    img: this.data.img,
                    isCollect: true,
                },
                success: res => {
                    this.setData({
                        isCollect: true
                    })
                    wx.showToast({
                        title: '已加入收藏夹',
                    })
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
    removeCollect() {
        let openid = wx.getStorageSync('openid')
        wx.cloud.database().collection('collects').where({
            _openid: openid,
            title: this.data.title
        }).remove({
            success: res => {
                wx.showToast({
                    title: '取消收藏成功',
                })
                // 样式控制
                this.setData({
                    isCollect: false
                })
            }
        })
    },
    /**
     * 开始阅读函数
     */
    read() {
        wx.navigateTo({
            url: '../cont/cont?title=' + this.data.title + '&&chapter=' + '1',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.title)
        let { title } = options;
        let openid = wx.getStorageSync('key')
        this.setData({
            title,
            openid
        })
        wx.cloud.database().collection('collects').where({
            _openid: openid
        }).get().then(res => {
            console.log(res.data)
            res.data.forEach(item => {
                if (this.data.title === item.title) {
                    this.setData({
                        isCollect: true
                    })
                }
            })
            
        })
        this.getintro(title)
        let that = this
        var set=setInterval(function(){
            clearInterval(set);
            that.setData({
                loading:false,//停止骨架屏
            })
          },500)
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
    tabSelect(e) {
        this.setData({
            tabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 2) * 200
        })
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