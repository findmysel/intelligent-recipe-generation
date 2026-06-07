// pages/search/search.ts - 食材搜索页
import { vegetables, meats, grainsFruits, cookingMethods } from '../../utils/data'

Page({
  data: {
    vegetables: vegetables,
    meats: meats,
    grainsFruits: grainsFruits,
    cookingMethods: cookingMethods,
    selectedIngredients: [] as string[],
    selectedMap: {} as Record<string, boolean>,
    selectedMethod: '',
    currentTab: 0,
    tabs: ['🥬 素食', '🥩 肉食', '🍜 面/谷物/水果'],
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  onLoad() {
    // 页面加载
  },

  // 切换食材分类tab
  onTabChange(e: any) {
    this.setData({ currentTab: e.currentTarget.dataset.index })
  },

  // 选择/取消食材
  onIngredientTap(e: any) {
    const name = e.currentTarget.dataset.name
    const selected = [...this.data.selectedIngredients]
    const index = selected.indexOf(name)
    if (index > -1) {
      selected.splice(index, 1)
    } else {
      selected.push(name)
    }
    const selectedMap: Record<string, boolean> = {}
    selected.forEach(s => { selectedMap[s] = true })
    this.setData({ selectedIngredients: selected, selectedMap })
  },

  // 选择烹饪方式
  onMethodTap(e: any) {
    const name = e.currentTarget.dataset.name
    if (this.data.selectedMethod === name) {
      this.setData({ selectedMethod: '' })
    } else {
      this.setData({ selectedMethod: name })
    }
  },

  // 清空选择
  onClear() {
    this.setData({
      selectedIngredients: [],
      selectedMap: {},
      selectedMethod: '',
    })
  },

  // 搜索食谱
  onSearch() {
    if (this.data.selectedIngredients.length === 0 && !this.data.selectedMethod) {
      wx.showToast({ title: '请至少选择一种食材或烹饪方式', icon: 'none' })
      return
    }
    const ingredients = encodeURIComponent(JSON.stringify(this.data.selectedIngredients))
    const method = encodeURIComponent(this.data.selectedMethod)
    wx.navigateTo({
      url: `/pages/recipe-list/recipe-list?ingredients=${ingredients}&method=${method}`
    })
  },
})
