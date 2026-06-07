// pages/article-detail/article-detail.ts - 文章详情页
import { apiGetArticles, getArticleComments, saveArticleComment, apiRateArticle, generateId } from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

Page({
  data: {
    article: null as any,
    comments: [] as any[],
    activeTab: 'content',
    showRatingModal: false,
    userRating: 5,
    showCommentModal: false,
    commentContent: '',
  },

  async onLoad(options: any) {
    const id = options.id
    if (!id) {
      wx.navigateBack()
      return
    }

    try {
      const all = await apiGetArticles()
      const article = all.find((a: any) => a.id === id)

      if (!article) {
        wx.showToast({ title: '文章不存在', icon: 'none' })
        setTimeout(() => wx.navigateBack(), 1500)
        return
      }

      const comments = getArticleComments(id)

      this.setData({
        article: article,
        comments: comments,
      })
      wx.setNavigationBarTitle({ title: article.title })
    } catch (err) {
      console.error('Failed to load article detail:', err)
    }
  },

  onGoBack() {
    wx.navigateBack()
  },

  // 切换Tab
  onTabSwitch(e: any) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  // 显示评分弹窗
  onShowRating() {
    if (!requireLogin()) return
    this.setData({ showRatingModal: true, userRating: 5 })
  },

  // 关闭评分弹窗
  onCloseRating() {
    this.setData({ showRatingModal: false })
  },

  // 选择评分
  onRatingSelect(e: any) {
    this.setData({ userRating: e.currentTarget.dataset.score })
  },

  // 提交评分
  async onSubmitRating() {
    const { article, userRating } = this.data
    try {
      wx.showLoading({ title: '提交中...' })
      await apiRateArticle(article.id, userRating)
      wx.hideLoading()
      this.setData({ showRatingModal: false })
      wx.showToast({ title: '评分成功', icon: 'success' })
      
      // 更新文章数据
      const all = await apiGetArticles()
      const updated = all.find((a: any) => a.id === article.id)
      if (updated) {
        this.setData({ article: updated })
      }
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '提交失败', icon: 'none' })
    }
  },

  // 显示评论弹窗
  onShowComment() {
    if (!requireLogin()) return
    this.setData({ showCommentModal: true, commentContent: '' })
  },

  // 关闭评论弹窗
  onCloseComment() {
    this.setData({ showCommentModal: false, commentContent: '' })
  },

  // 阻止事件冒泡
  stopProp() {},

  // 评论内容输入
  onCommentInput(e: any) {
    this.setData({ commentContent: e.detail.value })
  },

  // 键盘确认按钮
  onKeyboardConfirm() {
    // 触发提交评论
    this.onSubmitComment()
  },

  // 提交评论
  onSubmitComment() {
    const { article, commentContent } = this.data
    if (!commentContent.trim()) {
      wx.showToast({ title: '请输入评论内容', icon: 'none' })
      return
    }

    const userName = getCurrentUserName() || '美食爱好者'
    const comment = {
      id: generateId(),
      userName: userName,
      avatar: '',
      content: commentContent,
      time: '刚刚',
      likes: 0
    }

    saveArticleComment(article.id, comment)
    const comments = getArticleComments(article.id)
    this.setData({
      comments: comments,
      showCommentModal: false,
      commentContent: ''
    })
    wx.showToast({ title: '评论成功', icon: 'success' })
  },

  // 分享
  onShareAppMessage() {
    const article = this.data.article
    return {
      title: article.title,
      path: '/pages/article-detail/article-detail?id=' + article.id,
    }
  },
})