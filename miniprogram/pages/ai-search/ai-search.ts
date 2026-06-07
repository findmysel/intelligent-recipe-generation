// pages/ai-search/ai-search.ts - AI食谱检索页
import {
  fetchIngredients, fetchCookingMethods, fetchRecipes,
  searchAIRecipe, addAIRcipeToDatabase
} from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

Page({
  data: {
    vegetables: [] as any[],
    meats: [] as any[],
    grainsFruits: [] as any[],
    cookingMethods: [] as any[],
    cuisines: ['家常菜', '川菜', '粤菜', '鲁菜'],
    selectedIngredients: [] as string[],
    selectedMap: {} as Record<string, boolean>,
    selectedMethod: '',
    selectedCuisine: '',
    currentTab: 0,
    tabs: ['🥬 素食', '🥩 肉食', '🍜 面/谷物/水果'],
    searchResult: null as any,
    isSearching: false,
    notInDatabase: false,
    showSaveModal: false,
  },

  async onLoad() {
    await this.initData()
  },

  async initData() {
    try {
      const ings = await fetchIngredients()
      const methods = await fetchCookingMethods()
      this.setData({
        vegetables: ings.vegetables || [],
        meats: ings.meats || [],
        grainsFruits: ings.grainsFruits || [],
        cookingMethods: methods || []
      })
    } catch (err) {
      console.error('Failed to init ai-search data:', err)
    }
  },

  onTabChange(e: any) {
    this.setData({ currentTab: e.currentTarget.dataset.index })
  },

  onIngredientTap(e: any) {
    const item = e.currentTarget.dataset.item
    const map = { ...this.data.selectedMap }
    const list = [...this.data.selectedIngredients]

    if (map[item]) {
      delete map[item]
      const idx = list.indexOf(item)
      if (idx > -1) list.splice(idx, 1)
    } else {
      if (list.length >= 5) {
        wx.showToast({ title: '最多选5个', icon: 'none' })
        return
      }
      map[item] = true
      list.push(item)
    }

    this.setData({
      selectedMap: map,
      selectedIngredients: list
    })
  },

  onMethodTap(e: any) {
    const method = e.currentTarget.dataset.method
    this.setData({
      selectedMethod: this.data.selectedMethod === method ? '' : method
    })
  },

  onCuisineTap(e: any) {
    const cuisine = e.currentTarget.dataset.cuisine
    this.setData({
      selectedCuisine: this.data.selectedCuisine === cuisine ? '' : cuisine
    })
  },

  onReset() {
    this.setData({
      selectedIngredients: [],
      selectedMap: {},
      selectedMethod: '',
      selectedCuisine: ''
    })
  },

  async onAISearch() {
    const { selectedIngredients, selectedMethod, selectedCuisine } = this.data
    if (selectedIngredients.length === 0) {
      wx.showToast({ title: '请至少选择一种食材', icon: 'none' })
      return
    }

    this.setData({ isSearching: true, searchResult: null, notInDatabase: false })

    try {
      const matched = await fetchRecipes({
        ingredients: selectedIngredients,
        method: selectedMethod,
        cuisine: selectedCuisine
      })

      if (matched && matched.length > 0) {
        this.setData({
          isSearching: false,
          searchResult: {
            type: 'found',
            message: `在数据库中找到了 ${matched.length} 道相关食谱`,
            matchedRecipes: matched.slice(0, 3),
            allCount: matched.length
          }
        })
        wx.showToast({ title: '找到相关食谱！', icon: 'success' })
      } else {
        const keywords = selectedIngredients.join('、')
        const aiResult = searchAIRecipe(keywords)
        if (aiResult) {
          this.setData({
            isSearching: false,
            searchResult: {
              type: 'generated',
              aiRecipe: aiResult,
              message: '数据库中未找到相关食谱，AI为您创想了一道新食谱！'
            },
            notInDatabase: true
          })
        } else {
          this.setData({ isSearching: false })
          wx.showToast({ title: 'AI正在思考中', icon: 'none' })
        }
      }
    } catch (err) {
      this.setData({ isSearching: false })
      console.error('Search failed:', err)
    }
  },

  onShowSaveModal() {
    if (!requireLogin()) return
    this.setData({ showSaveModal: true })
  },

  onCloseSaveModal() {
    this.setData({ showSaveModal: false })
  },

  onAddToDatabase() {
    const result = this.data.searchResult
    if (result && result.type === 'generated' && result.aiRecipe) {
      addAIRcipeToDatabase(result.aiRecipe)
      this.setData({ showSaveModal: false, notInDatabase: false })
      wx.showToast({ title: '已添加到数据库！', icon: 'success' })
    }
  },

  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onSearchMore() {
    const result = this.data.searchResult
    if (result && result.type === 'found') {
      wx.navigateTo({
        url: '/pages/recipe-list/recipe-list?ingredients=' +
          encodeURIComponent(JSON.stringify(this.data.selectedIngredients)) +
          '&method=' + encodeURIComponent(this.data.selectedMethod)
      })
    }
  },

  onShareToCommunity() {
    if (!requireLogin()) return
    const result = this.data.searchResult
    if (result && result.type === 'generated' && result.aiRecipe) {
      const { apiSubmitPost, generateId } = require('../../utils/data')
      const userName = getCurrentUserName() || '我'
      const post = {
        id: generateId(),
        author: userName,
        avatar: '',
        content: `【AI创想食谱】${result.aiRecipe.name}：${result.aiRecipe.reason}...`,
        images: [],
        recipeId: '',
        recipeName: result.aiRecipe.name,
        likes: 0,
        comments: 0,
        time: '刚刚',
        isAI: true,
        isUserCreated: true,
        likedByUser: false
      }
      apiSubmitPost(post)
      wx.showToast({ title: '已分享到社区！', icon: 'success' })
    }
  },
})