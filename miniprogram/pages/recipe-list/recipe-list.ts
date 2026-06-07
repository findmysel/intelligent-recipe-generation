// pages/recipe-list/recipe-list.ts - 食谱列表页（使用后端 API，确保 ID 一致）
import { fetchRecipes } from '../../utils/data'

const ALL_CUISINES = ['全部', '川菜', '粤菜', '鲁菜', '苏菜', '浙菜', '湘菜', '闽菜', '徽菜', '家常菜', '西北菜', '东北菜', '创意菜']

function addIngredientsText(list: any[]): any[] {
  return list.map(r => ({
    ...r,
    ingredientsText: Array.isArray(r.ingredients) ? r.ingredients.join('、') : ''
  }))
}

Page({
  data: {
    allRecipes: [] as any[],       // 从后端拿到的全量数据（本次搜索结果）
    filteredRecipes: [] as any[],  // 按菜系过滤后的数据
    cuisines: ALL_CUISINES,
    selectedCuisine: '全部',
    selectedIngredients: [] as string[],
    selectedMethod: '',
    totalCount: 0,
    searchKeyword: '',
    loading: true,
  },

  onLoad(options: any) {
    let ingredients: string[] = []
    let method = ''
    let keyword = ''

    if (options.keyword) {
      keyword = decodeURIComponent(options.keyword)
    }
    if (options.ingredients) {
      try { ingredients = JSON.parse(decodeURIComponent(options.ingredients)) } catch (_) {}
    }
    if (options.method) {
      method = decodeURIComponent(options.method)
    }

    this.setData({ selectedIngredients: ingredients, selectedMethod: method, searchKeyword: keyword })
    this.loadFromApi(ingredients, method, keyword)
  },

  // 从后端 API 获取数据，确保 ID 始终与后端一致
  async loadFromApi(ingredients: string[], method: string, keyword: string) {
    try {
      this.setData({ loading: true })
      // 从后端获取全量食谱
      const all: any[] = await fetchRecipes()

      let results = all.filter((r: any) => r.status === 'approved' || !r.status)

      // 关键词搜索（匹配名称或食材）
      if (keyword) {
        results = results.filter((r: any) =>
          r.name?.includes(keyword) ||
          (Array.isArray(r.ingredients) && r.ingredients.some((i: string) => i.includes(keyword)))
        )
      }

      // 食材筛选
      if (ingredients.length > 0) {
        results = results.filter((r: any) =>
          Array.isArray(r.ingredients) &&
          ingredients.some(ing => r.ingredients.some((ri: string) => ri.includes(ing)))
        )
      }

      // 烹饪方式筛选
      if (method) {
        results = results.filter((r: any) => r.cookingMethod === method)
      }

      const formatted = addIngredientsText(results)
      this.setData({
        allRecipes: formatted,
        filteredRecipes: formatted,
        totalCount: formatted.length,
        loading: false,
      })
    } catch (err) {
      console.error('加载食谱失败:', err)
      this.setData({ loading: false })
    }
  },

  // 切换菜系筛选（在已加载的数据中本地过滤，无需重新请求）
  onCuisineChange(e: any) {
    const cuisine = e.currentTarget.dataset.cuisine
    const all = this.data.allRecipes
    const filtered = cuisine === '全部' ? all : all.filter((r: any) => r.cuisine === cuisine)
    this.setData({
      selectedCuisine: cuisine,
      filteredRecipes: filtered,
      totalCount: filtered.length,
    })
  },

  // 点击食谱跳转详情（ID 来自后端，完全一致）
  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onBackSearch() {
    wx.navigateBack()
  },

  onGoUpload() {
    wx.navigateTo({ url: '/pages/upload/upload' })
  },
})
