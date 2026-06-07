// pages/recipe-detail/recipe-detail.ts - 食谱详情页
import {
  fetchRecipeDetail, getRecipeReviews, saveReview,
  toggleFavorite, getFavorites, generateId
} from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

Page({
  data: {
    recipe: null as any,
    reviews: [] as any[],
    isFavorite: false,
    activeTab: 'steps',
    showReviewModal: false,
    reviewScore: 5,
    reviewComment: '',
    starsArray: [1, 2, 3, 4, 5],
  },

  async onLoad(options: any) {
    const id = options.id
    if (!id) { wx.navigateBack(); return }

    try {
      wx.showLoading({ title: '加载中...' })
      const recipe = await fetchRecipeDetail(id)
      wx.hideLoading()

      const revs = getRecipeReviews(id)
      const favs = getFavorites()

      this.setData({
        recipe: recipe,
        reviews: revs,
        isFavorite: favs.indexOf(id) > -1,
      })
      wx.setNavigationBarTitle({ title: recipe.name })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '食谱获取失败', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1500)
    }
  },

  onGoBack() {
    wx.navigateBack()
  },

  onTabSwitch(e: any) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onToggleFavorite() {
    if (!requireLogin()) return
    if (!this.data.recipe) return
    const isFav = toggleFavorite(this.data.recipe.id)
    this.setData({ isFavorite: isFav })
    wx.showToast({ title: isFav ? '已收藏' : '已取消收藏', icon: 'none' })
  },

  onShowReview() {
    if (!requireLogin()) return
    this.setData({ showReviewModal: true, reviewScore: 5, reviewComment: '' })
  },

  onCloseReview() {
    this.setData({ showReviewModal: false, reviewScore: 5, reviewComment: '' })
  },

  onScoreTap(e: any) {
    this.setData({ reviewScore: e.currentTarget.dataset.score })
  },

  onCommentInput(e: any) {
    this.setData({ reviewComment: e.detail.value })
  },

  stopProp() {},

  onKeyboardConfirm() {
    this.onSubmitReview()
  },

  onSubmitReview() {
    if (!this.data.reviewComment.trim()) {
      wx.showToast({ title: '请输入评价内容', icon: 'none' })
      return
    }

    const userName = getCurrentUserName() || '美食爱好者'
    const review = {
      id: generateId(),
      userName: userName,
      avatar: '',
      score: this.data.reviewScore,
      comment: this.data.reviewComment,
      time: '刚刚',
    }

    saveReview(this.data.recipe.id, review)
    const reviews = getRecipeReviews(this.data.recipe.id)

    this.setData({
      reviews: reviews,
      showReviewModal: false,
      reviewScore: 5,
      reviewComment: '',
    })

    wx.showToast({ title: '评价成功', icon: 'success' })
  },

  onShareAppMessage() {
    const recipe = this.data.recipe
    return {
      title: `推荐食谱：${recipe.name}`,
      path: `/pages/recipe-detail/recipe-detail?id=${recipe.id}`,
    }
  },
})