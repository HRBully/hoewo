
// 获取用户地址
export async function getLocation() {
    console.log('111');
    var QQMapWX = require('../lib/qqmap-wx-jssdk')
    var qqmapsdk = new QQMapWX({
        key: '5BKBZ-UQBEP-CX4DM-LCCZB-FPUTE-IEBJZ'
    })
    wx.getLocation({
        type: 'wgs84',
        success: (res) => {
            let latitude = res.latitude
            let longitude = res.longitude
            qqmapsdk.reverseGeocoder({
                location: {
                    latitude,
                    longitude
                },
                success: (res) => {
                    wx.setStorageSync('location', res.result.address_component)
                    // 省 province 市 city 区 district 街道 street 最低级地址 street_number
                    let {
                        city: location
                    } = wx.getStorageSync('location')
                    wx.setStorageSync('city', location.split('市')[0])
                    return location
                }

            })
        },
        fail: (res) => {
            wx.showModal({
                cancelColor: 'cancelColor',
                title: '未授权位置消息不能使用完整功能，是否前往授权',
                success: (res) => {
                    if (res.confirm) {
                        wx.openSetting({
                            withSubscriptions: true,
                        })
                    } else {
                        wx.showModal({
                            cancelColor: 'cancelColor',
                            content: '再次进入小程序会再次询问哦'
                        })
                    }
                }

            })
        }
    })

}