Component({
  options: {
    styleIsolation: 'isolated'
  },
  properties: {
    // 搜索框的提示字
    placeholder: {
      type: String,
      value: '请输入搜索内容',
    },
    // 搜索框的初始内容
    value: {
      type: String,
      value: ''
    },
    readOnly: {
      type: Boolean,
      value: false
    }
  },

  data: {
    // icon 的大小
    iconSize: 15
  },

  attached() {
    try {
      let _screenWidth = wx.getSystemInfoSync().screenWidth;
      this.setData({
        iconSize: Math.round(_screenWidth / 750 * 25)
      });
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    /**
     * 输入事件
     */
    _searchInput: function (e) {
      // 输入的内容
      let _value = e.detail.value;
      this.setData({
        value: _value
      });
      this.triggerEvent('input', {
        value: _value
      });
    },
    /**
     * 清除输入内容事件
     */
    _searchClear: function (e) {
      this.setData({
        value: ''
      });
      this.triggerEvent('clear', {});
    },
    /**
     * 搜索事件
     */
    _searchConfirm: function (e) {
      let { value } = this.data;
      if (!value) return false
      this.triggerEvent('search', { value });
    },

    _readOnly: function () {
      this.triggerEvent('readOnlyEle')
    }
  }
})