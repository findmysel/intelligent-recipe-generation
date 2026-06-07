import { apiGetPosts, apiSubmitPost, aiRecipes, generateId, apiUpdatePostStats, apiAddPostComment, apiGetHotRecipes } from '../../utils/data'
import { requireLogin, getCurrentUserName } from '../../utils/auth'

Page({
  data: {
    activeTab: 'posts',
    posts: [] as any[],
    hotRecipes: [] as any[],
    aiRecipeList: [] as any[],
    showPostModal: false,
    postContent: '',
    postRecipeName: '',
    selectedImages: [] as string[],
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    this.loadData()
  },

  onLoad() {
    this.loadData()
  },

  async loadData() {
    try {
      const [posts, hotRecipes] = await Promise.all([
        apiGetPosts(),
        apiGetHotRecipes(10)
      ])
      this.setData({
        posts: posts,
        hotRecipes: hotRecipes,
        aiRecipeList: aiRecipes,
      })
    } catch (err) {
      console.error('Failed to load community posts:', err)
    }
  },

  onTabChange(e: any) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onShowPost() {
    if (!requireLogin()) return
    this.setData({
      showPostModal: true,
      postContent: '',
      postRecipeName: '',
      selectedImages: []
    })
  },

  onClosePost() {
    this.setData({
      showPostModal: false,
      postContent: '',
      postRecipeName: '',
      selectedImages: []
    })
  },

  onPostContentInput(e: any) {
    this.setData({ postContent: e.detail.value })
  },

  onKeyboardConfirm() {
    this.onSubmitPost()
  },

  stopProp() {},

  onPostRecipeInput(e: any) {
    this.setData({ postRecipeName: e.detail.value })
  },

  onChooseImage() {
    const count = 9 - this.data.selectedImages.length
    if (count <= 0) {
      wx.showToast({ title: '最多上传9张图片', icon: 'none' })
      return
    }

    wx.chooseImage({
      count: count,
      sizeType: ['compressed'],
      success: (res) => {
        const total = this.data.selectedImages.concat(res.tempFilePaths).slice(0, 9)
        this.setData({ selectedImages: total })
      }
    })
  },

  onRemoveImage(e: any) {
    const index = e.currentTarget.dataset.index
    const images = [...this.data.selectedImages]
    images.splice(index, 1)
    this.setData({ selectedImages: images })
  },

  async onSubmitPost() {
    const { postContent, postRecipeName, selectedImages } = this.data
    if (!postContent.trim() && selectedImages.length === 0) {
      wx.showToast({ title: '请输入内容或上传图片', icon: 'none' })
      return
    }

    const userName = getCurrentUserName() || '我'
    const post = {
      id: generateId(),
      author: userName,
      avatar: '',
      content: postContent.trim() || '分享了图片',
      images: selectedImages,
      recipeId: '',
      recipeName: postRecipeName.trim() || '',
      likes: 0,
      comments: 0,
      time: '刚刚',
      isAI: false,
      isUserCreated: true,
      likedByUser: false,
    }

    try {
      wx.showLoading({ title: '正在分享...' })
      await apiSubmitPost(post as any)
      wx.hideLoading()
      this.setData({ showPostModal: false, postContent: '', postRecipeName: '', selectedImages: [] })
      this.loadData()
      wx.showToast({ title: '发布成功', icon: 'success' })
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '发布失败', icon: 'none' })
    }
  },

  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    if (id) wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  async onLike(e: any) {
    if (!requireLogin()) return
    const id = e.currentTarget.dataset.id
    
    const posts = this.data.posts
    const postIndex = posts.findIndex(p => p.id === id)
    if (postIndex === -1) return
    
    const post = posts[postIndex]
    const isLiked = post.likedByUser
    const delta = isLiked ? -1 : 1
    
    // 更新本地状态
    this.setData({
      [`posts[${postIndex}].likedByUser`]: !isLiked,
      [`posts[${postIndex}].likes`]: post.likes + delta
    })

    // 记录到本地缓存
    try {
      const stored = wx.getStorageSync('likedPosts')
      let likedPosts = stored ? JSON.parse(stored) : []
      if (!isLiked) {
        likedPosts.push(id)
      } else {
        likedPosts = likedPosts.filter((pId: string) => pId !== id)
      }
      wx.setStorageSync('likedPosts', JSON.stringify(likedPosts))
    } catch(e) {}
    
    // 同步到后端
    try {
      await apiUpdatePostStats(id, delta, 0)
    } catch (e) {
      console.error('更新点赞失败', e)
    }
  },

  async onComment(e: any) {
    if (!requireLogin()) return
    const id = e.currentTarget.dataset.id
    const userName = getCurrentUserName() || '我'
    
    wx.showModal({
      title: '发表留言',
      placeholderText: '写下你的评论...',
      editable: true,
      success: async (res) => {
        if (res.confirm && res.content) {
          wx.showLoading({ title: '发送中' })
          try {
            await apiAddPostComment(id, res.content, userName)
            wx.hideLoading()
            wx.showToast({ title: '留言成功', icon: 'success' })
            this.loadData() // 重新加载数据以更新评论列表
          } catch (err) {
            wx.hideLoading()
            wx.showToast({ title: '留言失败', icon: 'none' })
          }
        }
      }
    })
  },

  onPreviewImage(e: any) {
    const url = e.currentTarget.dataset.url
    const images = e.currentTarget.dataset.images || [url]
    wx.previewImage({ urls: images, current: url })
  },
})