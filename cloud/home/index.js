// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const TcbRouter = require('tcb-router');
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
    const app = new TcbRouter({ event });
    const wxContext = cloud.getWXContext()
    // 获取节气
    app.router('getSolarTerm', async (ctx, next) => {
        let currentTime = event.currentTime
        console.log(currentTime);
        let solarTerm = await db.collection('solar-term').where({
            time: _.gte(currentTime)
        }).limit(1).get()
        ctx.body = solarTerm
    })
    // 获取咨询信息
    app.router('getConsult', async (ctx, next) => {
        // 下拉刷新次数
        let account = event.account
        let result = await db.collection('consult').skip(account * 10).limit(10).get()
        ctx.body = result
    })
    // 获取新闻信息
    app.router('getNews', async (ctx, next) => {
        // 下拉刷新次数
        let account = event.account
        let result = await db.collection('news').skip(account * 10).limit(10).get()
        ctx.body = result
    })
    return app.serve()
}