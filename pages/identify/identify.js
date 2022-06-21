
var that = ''

let util = require('../../utils/util.js')
Page({
    data: {
        isShow: false,
        image: '../../images/plant.png',
        base64Img: '',
        token: '',
        result: [],
        contents:[],
        loading:true,
        /*
          百度AI识别的apikey跟密钥，动用或改动配置请告知
          author@Ned
        */
        apiKey: "KCGyrRIFg50RwMEt5ROIIEYc",
        secretKey: "wwiGniA2LFKGn0G3FfYcWay4Qpoei99G",
        season:''
    },
    //选择图片按钮
    imgSelect() {
        this.setData({
            isShow: false
        })
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePaths = res.tempFilePaths[0]
                this.getB64ByUrl(tempFilePaths)
                this.setData({
                    image: tempFilePaths
                })
            }
        })
    },
    //植物识别
    plant() {
        if (!this.data.base64Img) {
            this.setData({
                isShow: true
            })
            return
        }
        this.getToken()
    },
    //图片转为base64
    getB64ByUrl(url) {
        wx.getFileSystemManager().readFile({
            filePath: url,
            encoding: 'base64',
            success: (res) => {
                this.setData({
                    base64Img: res.data
                })
            }
        })
    },
    //获取token
    getToken() {
        wx.showLoading({
            title: '识别中...',
        })
        wx.request({
            url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.data.apiKey}&client_secret=${this.data.secretKey}`,
            success: (res) => {
                const token = res.data.access_token
                this.getResult(token)
            }
        })
    },
    // 关键字搜索
    search(value) {
        this.setData({
            contents: [],
        })
        wx.cloud.callFunction({
            name: 'search',
            data: {
                content: value,
                type:'contents'
            }
        }).then((res) => {
            const {
                result
            } = res;
            let {
                contents
            } = result;
            if (!contents) {
                wx.showToast({
                    title: '暂无相关信息',
                    icon: 'none',
                    duration: 1500
                })
            }
            contents.splice(6,contents.length-1)
            this.setData({
                contents:contents
            })
            console.log()
            console.log(this.data.contents)
        })
    },
    //获取识别结果
    getResult(token) {
        wx.request({
            url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token,
            method: 'POST',
            data: {
                image: this.data.base64Img
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                console.log(res.data.result)
                if(res.data.result[0].name === "非植物"){
                  wx.showModal({
                    title: '提示',
                    content:'图片为非植物，请重新上传',
                  })
                }else{
                  this.setData({
                    result: this.resultFilter(res.data.result)
                  })
                }
                
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    },
    //result结果过滤
    resultFilter(arr) {
        let cropstr = ''
        arr.forEach((item) => {
            item.score = (item.score.toFixed(4) * 100).toFixed(2) + '%'
            cropstr+=item.name
        })
        let croparr = cropstr.split('')
        console.log(croparr)
        let maxName, maxNum = 0
        // 遍历数组
        let res = {}
        croparr.forEach((item) => {
          res[item] ? res[item] += 1 : res[item] = 1
        })
        // 遍历 res
        for (let i in res) {
          if (res[i] > maxNum) {
            maxNum = res[i]
            maxName = i
          }
        }
        this.search(maxName)
        console.log(maxName)
        return arr
    },
    // 解决需要点击两次 tabbar 图标才会变换
    changeIcon() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            })
        }
    },
    goCont(e) {
        wx.navigateTo({
            url: '../cont/cont?title=' + e.currentTarget.dataset.title + '&&chapter=' + e.currentTarget.dataset.chapter,
        })
    },
    // 生命周期函数--监听页面加载
    onLoad: function (options) {
        let app = getApp()
        let that = this
        util.loadScreen(that,1000)
        util.setSeason(that)
        console.log(wx.getStorageSync('heightTabbar'))
        this.setData({
            titleHeight:app.globalData.titleHeight,
            heightTabbar:wx.getStorageSync('heightTabbar')
        })
    },
    // 生命周期函数--监听页面显示
    onShow: function () {
        this.changeIcon()
    }
})