
var that = ''

Page({
  data: {
     isShow:false,
     image:'../../images/plant.png',
     base64Img:'',
     token:'',
     result:[],
    /*
      百度AI识别的apikey跟密钥，动用或改动配置请告知
      author@Ned
    */
     apiKey:"KCGyrRIFg50RwMEt5ROIIEYc",
     secretKey:"wwiGniA2LFKGn0G3FfYcWay4Qpoei99G"
  },
  //选择图片按钮
  imgSelect(){
    this.setData({
      isShow:false
    })
    wx.chooseImage({
      count: 1,
      sizeType:['original', 'compressed'],
      sourceType:['album', 'camera'],
      success:(res)=>{
        const tempFilePaths = res.tempFilePaths[0]
        this.getB64ByUrl(tempFilePaths)
        this.setData({
          image:tempFilePaths
        })
      }
    })
  },
  //植物识别
  plant(){
    if(!this.data.base64Img){
      this.setData({
        isShow:true
      })
      return
    }
    this.getToken()
  },
  //图片转为base64
  getB64ByUrl(url){
    wx.getFileSystemManager().readFile({
      filePath:url,
      encoding:'base64',
      success:(res)=>{
        this.setData({
          base64Img:res.data
        })
      }
    })
  },
  //获取token
  getToken(){
    wx.showLoading({
      title: '识别中...',
    })
    wx.request({
      url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${this.data.apiKey}&client_secret=${this.data.secretKey}`,
      success:(res)=>{
         const token = res.data.access_token
        this.getResult(token)
      }
    })
  },
  //获取识别结果
  getResult(token){
   wx.request({
     url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token,
     method:'POST',
     data:{
      image:this.data.base64Img
     },
     header:{
       'Content-Type':'application/x-www-form-urlencoded'
     },
     success:(res)=>{
       console.log(res);
       this.setData({
         result:that.resultFilter(res.data.result)
       })
     },
     complete:()=>{
       wx.hideLoading()
     }
   })
  },
  //result结果过滤
  resultFilter(arr){
    arr.forEach((item)=>{
      item.score = (item.score.toFixed(4)*100).toFixed(2) + '%'
    })
    return arr
    },
   // 生命周期函数--监听页面加载
  onLoad: function (options) {
   that = this
  },
})