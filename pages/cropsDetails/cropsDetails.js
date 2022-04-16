// pages/cropsDetails/cropsDetails.js
//路径根据你的实际情况更改
var WxParse = require('../../wxParse/wxParse');
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        wx.cloud.database().collection('crops').doc(options.id).get()
<<<<<<< Updated upstream
            .then(res => {
                let text = res.data.introduce
                WxParse.wxParse('rich', 'html', text, this); 
                console.log(res.data.introduce)
            })
=======
          .then(res => {
              WxParse.wxParse('courseDetail' , 'html', res.data.introduce, this)
              console.log(node.nodes)
          })
>>>>>>> Stashed changes
    },
})