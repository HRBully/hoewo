// app.js
App({
    // 小程序启动执行
    globalData: {
        loginStatus: false,
        season: 'spring'
    },
    // 获取季节
    getSeason() {
        let date = new Date()
        let month = date.getMonth() + 1
        switch (month) {
            case month > 2 && month < 6:
                this.globalData.season = 'spring'
                break;
            case month > 5 && month < 9:
                this.globalData.season = 'summer'
                break;
            case month > 8 && month < 12:
                this.globalData.season = 'autumn'
                break;
            case month > 11 || month <3:
                this.globalData.season = 'winter'
                break;
        }

    },
    onLaunch() {
        this.getSeason()
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