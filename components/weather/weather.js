// components/weather/weather.js
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
        wea_img: '',// 天气图标路径
        wea: '', // 天气
        tem: '', // 当前温度
        temH: '', // 最高温度
        temL: '', //最低温度
        air_level: '',  //空气水平
        month: '', //月份
        day: 0, // 日期
        nextwea_img: '',// 明天天气图标路径
        nextwea: '', // 明天天气
        nexttem: '', // 明天当前温度
        nexttemH: '', // 明天最高温度
        nexttemL: '', //明天最低温度
        nextair_level: '',  //空气水平
        nextmonth: '', //月份
        nextday: 0 // 明天
    },

    /**
     * 组件的方法列表
     */
    methods: {
        getWeather() {
            wx.request({
                url: 'https://yiketianqi.com/api?unescape=1&version=v1&appid=44831462&appsecret=nyT7UNR2',
                success: (res) => {
                    // 今日日期
                    let date = res.data.data[0].date
                    console.log(res.data)
                    console.log(res.data.data[1]);
                    let dateArry = date.split('-')
                    let month = dateArry[1] * 1
                    let day = dateArry[2] * 1
                    // 明日日期
                    let nextdate = res.data.data[1].date
                    let nextdateArry = date.split('-')
                    let nextmonth = dateArry[1] * 1
                    let nextday = dateArry[2] * 1
                    this.setData({
                        // 今日
                        month,
                        day,
                        wea_img: `../../images/tianqi/${res.data.data[0].wea_img}.png`,
                        wea: res.data.data[0].wea, 
                        tem: res.data.data[0].tem,
                        temH: res.data.data[0].tem1,
                        temL: res.data.data[0].tem2,
                        air_level: res.data.data[0].air_level,
                        // 明日
                        nextmonth,
                        nextday,
                        nextwea_img: `../../images/tianqi/${res.data.data[1].wea_img}.png`,
                        nextwea: res.data.data[1].wea, 
                        nexttem: res.data.data[1].tem,
                        nexttemH: res.data.data[1].tem1,
                        nexttemL: res.data.data[1].tem2,
                        nextair_level: res.data.data[1].air_level,
                    })
                }
            })
        },
    },
    pageLifetimes:{
        show() {
            this.getWeather()
        }
    }
})
