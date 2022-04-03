// app.js
App({
  // 小程序启动执行
  onLaunch() {
    console.log("小程序启动")
    wx.cloud.init({
      // 云开发环境id
      env: 'helpfarmers-5g7z61ck3843e204'
    })
  }
})
