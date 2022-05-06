// components/preBuild/preBuild.js
import wxParse from "../../wxParse/wxParse.js";
// var wxParse = require("/wxParse/wxParse");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bindName: {
      type: String
    },
    type: {
      type: String,
      value: "html"
    },
    data: {
      type: String
    },
    imagePadding: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    build() {
      /**
      * WxParse.wxParse(bindName , type, data, target,imagePadding)
      * 1.bindName绑定的数据名(必填)
      * 2.type可以为html或者md(必填)
      * 3.data为传入的具体数据(必填)
      * 4.target为Page对象,一般为this(必填)
      * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
      */
      let { bindName, type, data, imagePadding } = this.properties;
      wxParse.wxParse(bindName, type, data, this, imagePadding)
      this.setData({
        value: this.data[bindName].nodes
      })
    },
    wxParseTagATap() {
      return false
    },
  }
})
