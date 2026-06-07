// pages/index/index.ts - 首页
import { fetchRecipes, apiGetArticles, getDailyLuckyRecipe } from '../../utils/data'
import { requireLogin } from '../../utils/auth'

Page({
  data: {
    hotRecipes: [] as any[],
    bannerRecipes: [] as any[],
    topArticles: [] as any[],
    dailyLucky: null as any,
    categories: [
      { id: '1', name: '快手菜', icon: '⚡' },
      { id: '2', name: '家常菜', icon: '🏠' },
      { id: '3', name: '素食', icon: '🥗' },
      { id: '4', name: '汤粥', icon: '🥣' },
      { id: '5', name: '面食', icon: '🍜' },
      { id: '6', name: '甜点', icon: '🍰' },
      { id: '7', name: '大餐', icon: '🥩' },
      { id: '8', name: '查看更多', icon: '➕' }
    ],
    searchPlaceholder: '想吃点什么？'
  },

  onLoad() {
    this.loadData()
  },

  async loadData() {
    try {
      const hot = await fetchRecipes()
      const banner = hot.slice(0, 3)
      const allArticles = await apiGetArticles()
      const articles = allArticles.slice(0, 3)
      const lucky = getDailyLuckyRecipe()

      this.setData({
        hotRecipes: hot,
        bannerRecipes: banner,
        topArticles: articles,
        dailyLucky: lucky,
      })
    } catch (err) {
      console.error('Failed to load home data:', err)
    }
  },

  onQuickEntry(e: any) {
    const category = e.currentTarget.dataset.category
    if (category === 'search') {
      wx.switchTab({ url: '/pages/search/search' })
    } else if (category === 'ai') {
      wx.navigateTo({ url: '/pages/ai-search/ai-search' })
    } else if (category === 'article') {
      wx.navigateTo({ url: '/pages/article-list/article-list' })
    } else if (category === 'lucky') {
      wx.navigateTo({ url: '/pages/lucky-box/lucky-box' })
    } else {
      wx.switchTab({ url: '/pages/search/search' })
    }
  },

  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onArticleTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/article-detail/article-detail?id=' + id })
  },

  onSearchTap() {
    wx.switchTab({ url: '/pages/search/search' })
  },

  onUploadTap() {
    if (!requireLogin()) return
    wx.navigateTo({ url: '/pages/upload/upload' })
  },

  onHotRankTap() {
    wx.navigateTo({ url: '/pages/hot-rank/hot-rank' })
  },

  onLuckyBoxTap() {
    wx.navigateTo({ url: '/pages/lucky-box/lucky-box' })
  },
})