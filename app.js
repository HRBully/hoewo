// app.js
App({
    // 小程序启动执行
    globalData: {
        loginStatus: false,
        season: 'spring'
    },
    onLaunch() {
        console.log("小程序启动")
        wx.cloud.init({
            // 云开发环境id
            env: 'helpfarmers-5g7z61ck3843e204',
            traceUser: true,
        })
        let capsuleObj = wx.getMenuButtonBoundingClientRect();
        // console.log("==胶囊信息==");
        // console.log(capsuleObj);
        wx.getSystemInfo({
            success: (res) => {
                // console.log("==获取系统信息==");
                // console.log(res)
                var statusBarHeight = res.statusBarHeight; //顶部状态栏高度
                this.globalData.capsuleObj = capsuleObj;
                this.globalData.titleHeight = statusBarHeight + capsuleObj.height + (capsuleObj.top - statusBarHeight) * 2;
            },
            failure() {}
        })

    },

})