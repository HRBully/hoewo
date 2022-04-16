// pages/test2/test2.js
Page({
  data: {
    tabCur: 0, //默认选中
    tabs: [{
        name: '全部',
        id: 0
      },
      {
        name: '谷物',
        id: 1
      },
      {
        name: '蔬菜',
        id: 2
      },
      {
        name: '水果',
        id: 3
      },
    ],
    crops: [],
    crop: [],
    searchValue: '',
    viewBoolean: false
  },
  onLoad: function () {
<<<<<<< Updated upstream
    wx.cloud.database().collection('crops').limit(1).get()
=======
    wx.cloud.database().collection('crops').get()
>>>>>>> Stashed changes
      .then(res => {
        console.log(res.data)
        this.setData({
          crops: res.data
        })
      })
  },
  //选择条目
  tabSelect(e) {
    let name = this.data.tabs[e.currentTarget.dataset.id].name
    if (name === "全部") {
<<<<<<< Updated upstream
      wx.cloud.database().collection('crops').skip(this.data.crops.length).limit(2).get()
=======
      wx.cloud.database().collection('crops').get()
>>>>>>> Stashed changes
        .then(res => {
          console.log(res.data)
          this.setData({
            crops: res.data
          })
        })
    } else {
      wx.cloud.database().collection('crops').where({
<<<<<<< Updated upstream
          done:false
        }).limit(2).get()
=======
          kind: name
        }).get()
>>>>>>> Stashed changes
        .then(res => {
          this.setData({
            crops: res.data
          })
<<<<<<< Updated upstream
        })
    }

    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
  },
  searchInput: function (e) {
    if (e.detail.value !== "") {
      this.setData({
        viewBoolean: true
      })
    } else {
      this.setData({
        viewBoolean: false,
        crop: []
      })
    }

  },
  /**
   * 搜索框清除监听
   */
  searchClear: function (e) {
    this.setData({
      viewBoolean: false,
      crop: []
    })
  },
  /**
   * 搜索框右侧按钮点击监听
   */
  searchTab: function (e) {
    let _key = e.detail.key;
    let _value = e.detail.value;
    if (_key === 'search') {
      console.log('searchTab >>> search');
      console.log(e.detail.value);
    } else if (_key === 'back') {
      console.log('searchTab >>> back');
      console.log(e.detail);
    }
    wx.cloud.database().collection('crops').where({
        name: e.detail.value
      }).get()
      .then(res => {
        this.setData({
          crop: res.data
        })
      })
  },
  cropsDetails(e) {
    wx.navigateTo({
      url: '../cropsDetails/cropsDetails?id=' + e.currentTarget.dataset.id,
    })
  }

=======
        })
    }

    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
  },
  searchInput: function (e) {
    if (e.detail.value !== "") {
      this.setData({
        viewBoolean: true
      })
    } else {
      this.setData({
        viewBoolean: false,
        crop: []
      })
    }

  },
  /**
   * 搜索框清除监听
   */
  searchClear: function (e) {
    this.setData({
      viewBoolean: false,
      crop: []
    })
  },
  /**
   * 搜索框右侧按钮点击监听
   */
  searchTab: function (e) {
    let _key = e.detail.key;
    let _value = e.detail.value;
    if (_key === 'search') {
      console.log('searchTab >>> search');
      console.log(e.detail.value);
    } else if (_key === 'back') {
      console.log('searchTab >>> back');
      console.log(e.detail);
    }
    wx.cloud.database().collection('crops').where({
        name: e.detail.value
      }).get()
      .then(res => {
        this.setData({
          crop: res.data
        })
      })
  },
  cropClick(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url:'../../pages/cropsDetails/cropsDetails?id='+ e.currentTarget.dataset.id,
    })
  }
>>>>>>> Stashed changes
})