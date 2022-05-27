const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}
const loadScreen = (that,time) => {
    var set = setInterval(function () {
        clearInterval(set);
        that.setData({
            loading: false, //停止骨架屏
            hidden:false
        })
    }, time)
}
const setSeason = (that) => {
    const app = getApp();
    that.setData({
        season: app.globalData.season
    })
}
const errModal = () => {
    wx.showModal({
        title: '提示',
        content:'无法连接到网络',
    })
}
module.exports = {
    formatTime,
    loadScreen,
    setSeason,
    errModal
}