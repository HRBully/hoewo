Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: true,
        isLogin: false,
        openid:'',
        tabCur: 0, //默认选中
        tabs: [{
                name: '种植',
                id: 0
            },
            {
                name: '设置',
                id: 1
            },
        ],
        setitems: [
            { text: '意见反馈', url: '#', icon: '', tips: '', arrows: '' },
            { text: '关于我们', url: '#', icon: '', tips: '', arrows: '' },
            { text: '联系客服', url: '#', icon: '', tips: '', arrows: '' }
          ]
    },

    onLoad: function (options) {
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this.setData({
                isLogin: true,
                userImg: userInfo.avatarUrl,
                userName: userInfo.nickName
            })
        } else {
            wx.showToast({
                title: '未登录',
                icon: 'none',
                duration: 1500
              })
            this.setData({
                isLogin: false
            })
        }
    },
    login() {

        console.log(1)
        wx.getUserProfile({
                desc: '用户完善会员资料',
            })
            .then(res => {
                wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                wx.setStorageSync('userInfo', res.userInfo)
                wx.cloud.callFunction({
                    name: 'login',
                }).then(res => {
                    this.setData({
                        openid:res.result.openid
                    })
                    wx.setStorageSync('openid', res.result.openid)
                })
                this.setData({
                    isLogin: true,
                    userImg: res.userInfo.avatarUrl,
                    userName: res.userInfo.nickName
                })
            })
            .catch(err => {
                console.log("用户拒绝了微信授权登录", err);
            })
    },
    tabSelect(e) {
        this.setData({
            tabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 2) * 200
        })
    },
})