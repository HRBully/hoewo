// components/headBar/headBar.js
// components/customHeader/index.js
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        customTitle: String,
        bgColor: {
            type: String,
            value: '#fff'
        },
        menuFlag: {
            type: Boolean,
            value: false
        },
        backHomeFlag: {
            type: Boolean,
            value: false
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    attached: function() {
        this.setData({
            titleHeight: app.globalData.titleHeight,
            capsuleObj: app.globalData.capsuleObj
        })
    },

    options: {
        multipleSlots: true, //开启多slot
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 菜单
        meunClick: function () {
            wx.navigateTo({
                url: '/pages/menu/menu',
            })
        },

        // 返回
        backClick: function() {
            wx.navigateBack({
                delta: 1
            })
        },
        
        // 回首页
        homeClick: function() {
            wx.navigateTo({
                url: '/pages/index/index'
            })
        },
    }
})
