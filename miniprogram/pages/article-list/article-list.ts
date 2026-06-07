// pages/article-list/article-list.ts - 饮食文化文章列表页
import { apiGetArticles, apiSubmitArticle, generateId } from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

Page({
  data: {
    articles: [] as any[],
    topArticles: [] as any[],
    userArticles: [] as any[],
    hasUserArticles: false,
    activeTab: 'recommend',
    showPublishModal: false,
    publishTitle: '',
    publishContent: '',
    publishTags: '',
  },

  onShow() {
    this.loadData()
  },

  async loadData() {
    try {
      wx.showLoading({ title: '加载中...' })
      const all = await apiGetArticles()
      const top = all.slice(0, 3) 
      const userName = getCurrentUserName() || '我'
      const userArticles = all.filter(a => a.author === userName)
      
      this.setData({
        articles: all,
        topArticles: top,
        userArticles: userArticles,
        hasUserArticles: userArticles.length > 0,
      })
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      console.error('Failed to load articles:', err)
    }
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 切换Tab
  onTabChange(e: any) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 跳转文章详情
  onArticleTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/article-detail/article-detail?id=' + id })
  },

  // 显示发布弹窗
  onShowPublish() {
    if (!requireLogin()) return
    this.setData({ showPublishModal: true, publishTitle: '', publishContent: '', publishTags: '' })
  },

  // 关闭发布弹窗
  onClosePublish() {
    this.setData({ showPublishModal: false })
  },

  onTitleInput(e: any) {
    this.setData({ publishTitle: e.detail.value })
  },

  onContentInput(e: any) {
    this.setData({ publishContent: e.detail.value })
  },

  onTagsInput(e: any) {
    this.setData({ publishTags: e.detail.value })
  },

  onPublishConfirm() {
    this.onSubmitArticle()
  },

  // 提交文章
  async onSubmitArticle() {
    const { publishTitle, publishContent, publishTags } = this.data
    if (!publishTitle.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    if (!publishContent.trim()) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }

    const userName = getCurrentUserName() || '我'
    const article = {
      id: generateId(),
      title: publishTitle.trim(),
      cover: '',
      summary: publishContent.slice(0, 80) + '...',
      content: publishContent,
      author: userName,
      authorAvatar: '',
      publishTime: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(publishContent.length / 500) + '分钟',
      rating: 0,
      ratingCount: 0,
      userRatings: [],
      tags: publishTags.split(/[,，、\s]+/).filter((s: string) => s),
      isUserCreated: true
    }

    try {
      wx.showLoading({ title: '发布中...' })
      await apiSubmitArticle(article as any)
      wx.hideLoading()
      this.setData({ showPublishModal: false, publishTitle: '', publishContent: '', publishTags: '' })
      await this.loadData()
      wx.showToast({ title: '发布成功', icon: 'success' })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '发布失败', icon: 'none' })
    }
  },
})