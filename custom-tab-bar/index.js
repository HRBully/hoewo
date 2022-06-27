// custom-tab-bar/index.js
const app = getApp()
// 季节判断
let date = new Date()
let Month = date.getMonth()
let pattern = /[3-8]/
let season, text_color
// 切换主题
// Month = 9
if (pattern.test(Month)) {
    season = 'spring'
    text_color = '#6cd793'
    app.globalData.season = 'spring'
} else {
    season = 'autumn'
    text_color = '#df7373'
    app.globalData.season = 'autumn'
}
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
   lifetimes:{
       created(){
            
       },
        attached() {
            if (!wx.getStorageSync('heightTabbar')) {
                let query = this.createSelectorQuery();
                query.select('.tab-bar').boundingClientRect(function (rect) {
                    wx.setStorageSync('heightTabbar', rect.height) // 将获取到的高度设置缓存，以便之后使用
                }).exec();
            }
        },
   },
    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        color: "#a9b7b7",
        selectedColor: text_color,
        borderStyle: "#fff",
        list: [{
            selectedIconPath: `../images/tabicon/${season}-home-active.png`,
            iconPath: `../images/tabicon/spring-home.png`,
            pagePath: "../home/home",
            text: "首页"
        }, {
            selectedIconPath: `../images/tabicon/${season}-book-active.png`,
            iconPath: `../images/tabicon/spring-book.png`,
            pagePath: "../addCrop/addCrop",
            text: "农识"
        }, {
            selectedIconPath: `../images/tabicon/${season}-camera-active.png`,
            iconPath: `../images/tabicon/spring-camera.png`,
            pagePath: "../identify/identify",
            text: "识别"
        }, {
            selectedIconPath: `../images/tabicon/${season}-person-active.png`,
            iconPath: `../images/tabicon/spring-person.png`,
            pagePath: "../person/person",
            text: "个人"
        }]
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({
                url
            })
            this.setData({
                selected: data.index
            })
        }
    }
})