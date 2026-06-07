// custom-tab-bar/index.ts
Component({
  data: {
    selected: 0,
    color: '#999999',
    selectedColor: '#FF6B35',
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        icon: '🏠'
      },
      {
        pagePath: '/pages/search/search',
        text: '搜索',
        icon: '🔍'
      },
      {
        pagePath: '/pages/community/community',
        text: '社区',
        icon: '💬'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的',
        icon: '👤'
      }
    ]
  },
  methods: {
    switchTab(e: any) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  }
})
