import { getDailyLuckyRecipe, getRandomRecipe, apiGetRandomRecipe, getLuckyBoxHistory, addLuckyBoxRecord } from '../../utils/data'

Page({
  data: {
    dailyRecipe: null as any,
    isOpened: false,
    isAnimating: false,
    history: [] as any[],
    canOpen: true,
  },

  onLoad() {
    let daily = getDailyLuckyRecipe()
    // 如果本地没有数据，尝试回退到 getRandomRecipe
    if (!daily) {
      daily = getRandomRecipe()
    }
    this.setData({
      dailyRecipe: daily,
      history: getLuckyBoxHistory(),
    })
  },

  onOpenBox() {
    if (this.data.isAnimating || this.data.isOpened) return
    this.setData({ isAnimating: true })
    setTimeout(() => {
      this.setData({
        isAnimating: false,
        isOpened: true
      })
      if (this.data.dailyRecipe) {
        addLuckyBoxRecord(this.data.dailyRecipe.id, this.data.dailyRecipe.name)
        this.setData({ history: getLuckyBoxHistory() })
      }
    }, 1500)
  },

  async onReRoll() {
    if (this.data.isAnimating) return
    this.setData({ isAnimating: true, isOpened: false })
    try {
      const recipe = await apiGetRandomRecipe()
      this.setData({
        dailyRecipe: recipe,
        isOpened: false,
        isAnimating: false,
        canOpen: true,
      })
    } catch (err) {
      console.error('Failed to get random recipe:', err)
      this.setData({ isAnimating: false })
    }
  },

  onRecipeTap() {
    if (!this.data.isOpened) return
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + this.data.dailyRecipe.id })
  },

  onHistoryTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onShareAppMessage() {
    const recipe = this.data.dailyRecipe
    return {
      title: '🎁 我抽到了「' + (recipe ? recipe.name : '神秘美食') + '」，你也来试试！',
      path: '/pages/lucky-box/lucky-box',
    }
  },

  onShareBox() {
    // 触发原生分享菜单
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
})