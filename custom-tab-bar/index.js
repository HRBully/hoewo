// custom-tab-bar/index.js
const app = getApp()
let season = 'spring'
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        color: "#a9b7b7",
        selectedColor: "#6cd793",
        borderStyle: "#fff",
        list:[{
            selectedIconPath: `../images/${season}-homeActive.png`,
            iconPath: `../images/${season}-home.png`,
            pagePath: "../home/home",
            text: "首页"
          },{
            selectedIconPath: `../images/${season}-addActive.png`,
            iconPath: `../images/${season}-add.png`,
            pagePath: "../addCrop/addCrop",
            text: "添加"
          },{
            selectedIconPath: `../images/${season}-addActive.png`,
            iconPath: `../images/${season}-add.png`,
            pagePath: "../identify/identify",
            text: "识别"
          },{
            selectedIconPath: `../images/${season}-personActive.png`,
            iconPath: `../images/${season}-person.png`,
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
            wx.switchTab({url})
            this.setData({
              selected: data.index
            })
          }
    }
})
