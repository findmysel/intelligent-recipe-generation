// pages/hot-rank/hot-rank.ts - 热门食谱排行页
import { getHotSearchKeywords, getAllRecipes } from '../../utils/data'

Page({
  data: {
    activePeriod: 'day' as 'day' | 'week' | 'month',
    hotKeywords: [] as { keyword: string, count: number }[],
    hotRecipes: [] as any[],
    periodLabel: '今日',
    periods: [
      { key: 'day', label: '今日' },
      { key: 'week', label: '本周' },
      { key: 'month', label: '本月' }
    ],
  },

  onLoad() {
    this.refreshData('day')
  },

  // 统一的数据刷新函数，接收 period 作为参数
  refreshData(period: 'day' | 'week' | 'month') {
    const periods = this.data.periods
    const label = periods.find(p => p.key === period)?.label || '今日'

    const keywords = getHotSearchKeywords(period)
    const allRecipes = getAllRecipes()

    // 增加数据安全性检查并排序
    const topRecipes = allRecipes
      .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
      .slice(0, 20)
      .map((r, i) => ({ ...r, rank: i + 1 }))

    // 关键修复：一次性设置所有相关状态，避免渲染层多次冲突
    this.setData({
      activePeriod: period,
      periodLabel: label,
      hotKeywords: keywords,
      hotRecipes: topRecipes,
    })
  },

  // 切换时间段
  onPeriodChange(e: any) {
    const period = e.currentTarget.dataset.period
    if (period === this.data.activePeriod) return // 防止重复点击
    this.refreshData(period)
  },

  // 点击食谱
  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  // 搜索热词
  onKeywordTap(e: any) {
    const keyword = e.currentTarget.dataset.keyword
    wx.navigateTo({
      url: '/pages/recipe-list/recipe-list?keyword=' + encodeURIComponent(keyword)
    })
  },
})