import { apiSubmitRecipe, generateId, cuisines, cookingMethods } from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

const difficultyOptions = ['极简', '容易', '中等', '困难', '大师级']
const regionOptions = ['特色菜', '家常菜', '快手菜', '创意菜', '素食', '下饭菜', '节日菜肴']

Page({
  data: {
    name: '',
    ingredients: '',
    cookingMethod: '',
    cuisine: '',
    difficulty: '中等',
    time: '',
    steps: '',
    tips: '',
    culture: '',
    region: '',
    
    // 界面绑定的列表数据 (需与 wxml 中的 range 对应)
    cuisineList: cuisines,
    cookingMethods: cookingMethods.map(m => `${m.name} ${m.emoji}`),
    difficultyList: difficultyOptions,
    regionList: regionOptions,
    
    // 选择器索引
    methodIndex: 0,
    cuisineIndex: 0,
    difficultyIndex: 2,
    regionIndex: 0
  },

  // 统一 WXML 中的输入处理函数名
  onInputName(e: any) { this.setData({ name: e.detail.value }) },
  onInputIngredients(e: any) { this.setData({ ingredients: e.detail.value }) },
  onInputTime(e: any) { this.setData({ time: e.detail.value }) },
  onInputSteps(e: any) { this.setData({ steps: e.detail.value }) },
  onInputTips(e: any) { this.setData({ tips: e.detail.value }) },
  onInputCulture(e: any) { this.setData({ culture: e.detail.value }) },

  // 选择器处理
  onMethodChange(e: any) {
    const idx = e.detail.value
    this.setData({
      methodIndex: idx,
      cookingMethod: this.data.cookingMethods[idx]
    })
  },
  onCuisineChange(e: any) {
    const idx = e.detail.value
    this.setData({
      cuisineIndex: idx,
      cuisine: this.data.cuisineList[idx]
    })
  },
  onDifficultyChange(e: any) {
    const idx = e.detail.value
    this.setData({
      difficultyIndex: idx,
      difficulty: this.data.difficultyList[idx]
    })
  },
  onRegionChange(e: any) {
    const idx = e.detail.value
    this.setData({
      regionIndex: idx,
      region: this.data.regionList[idx]
    })
  },

  onGoBack() {
    wx.navigateBack()
  },

  async onSubmit() {
    if (!requireLogin()) return
    const { name, ingredients, cookingMethod, cuisine, difficulty, time, steps, tips, culture, region } = this.data
    
    if (!name.trim()) { wx.showToast({ title: '请输入食谱名称', icon: 'none' }); return }
    if (!ingredients.trim()) { wx.showToast({ title: '请输入所需食材', icon: 'none' }); return }
    if (!cookingMethod) { wx.showToast({ title: '请选择烹饪方式', icon: 'none' }); return }
    if (!steps.trim()) { wx.showToast({ title: '请输入做法步骤', icon: 'none' }); return }

    const userName = getCurrentUserName() || '我的食谱'
    const recipe = {
      id: generateId(),
      name: name.trim(),
      image: '',
      ingredients: ingredients.split(/[,，、\s]+/).filter((s: string) => s),
      cookingMethod: cookingMethod.split(' ')[0], // 移除 emoji 存入数据库
      cuisine: cuisine || '家常菜',
      difficulty: difficulty || '中等',
      time: time || '30分钟',
      steps: steps.split('\n').filter((s: string) => s.trim()),
      tips: tips || '暂无特别注意事项',
      culture: culture || '这是一道用户分享的独家食谱',
      rating: 0,
      ratingCount: 0,
      isUserCreated: true,
      region: region || '特色菜',
      author: userName,
    }

    try {
      wx.showLoading({ title: '提交审核中...' })
      await apiSubmitRecipe(recipe as any)
      wx.hideLoading()
      wx.showToast({ title: '上传成功！', icon: 'success' })
      setTimeout(() => { wx.navigateBack() }, 1500)
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '提交失败', icon: 'none' })
    }
  },
})
