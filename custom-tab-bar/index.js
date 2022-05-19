// custom-tab-bar/index.js
const app = getApp()
// 季节判断
let date = new Date()
let Month = date.getMonth()
console.log(Month)
console.log(typeof Month)
switch (Month) {
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
        var season = 'spring'
        app.globalData.season = 'spring'
        break;
    case 9:
    case 10:
    case 11:
    case 12:
    case 1:
    case 2:
        var season = 'autumn'
        app.globalData.season = 'autumn'
        break;
}
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    attached() {
        if (!wx.getStorageSync('heightTabbar')) {
            let query = this.createSelectorQuery();
            query.select('.tab-bar').boundingClientRect(function (rect) {
                wx.setStorageSync('heightTabbar', rect.height) // 将获取到的高度设置缓存，以便之后使用
            }).exec();
        }

    },
    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        color: "#a9b7b7",
        selectedColor: "#6cd793",
        borderStyle: "#fff",
        list: [{
            selectedIconPath: `../images/tabicon/${season}-home-active.png`,
            iconPath: `../images/tabicon/${season}-home.png`,
            pagePath: "../home/home",
            text: "首页"
        }, {
            selectedIconPath: `../images/tabicon/${season}-book-active.png`,
            iconPath: `../images/tabicon/${season}-book.png`,
            pagePath: "../addCrop/addCrop",
            text: "添加"
        }, {
            selectedIconPath: `../images/tabicon/${season}-camera-active.png`,
            iconPath: `../images/tabicon/${season}-camera.png`,
            pagePath: "../identify/identify",
            text: "识别"
        }, {
            selectedIconPath: `../images/tabicon/${season}-person-active.png`,
            iconPath: `../images/tabicon/${season}-person.png`,
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