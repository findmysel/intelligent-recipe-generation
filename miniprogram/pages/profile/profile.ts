// pages/profile/profile.ts - 个人中心页
import { getUserRecipes, getFavorites, recipes, aiRecipes, apiRegister, apiLogin } from '../../utils/data'

Page({
  data: {
    isLoggedIn: false,
    userInfo: { nickname: '', avatar: '' },
    showLoginModal: false,
    showRegisterModal: false,
    loginName: '',
    loginPwd: '',
    regName: '',
    regPwd: '',
    regPwd2: '',
    activeTab: 'recipes',
    myRecipes: [] as any[],
    favoriteRecipes: [] as any[],
    stats: {
      recipeCount: 0,
      favoriteCount: 0,
    },
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
    this.checkLogin()
    this.loadData()
  },

  onLoad() {
    this.checkLogin()
    this.loadData()
  },

  // 检查登录状态
  checkLogin() {
    const user = wx.getStorageSync('currentUser')
    if (user) {
      this.setData({ isLoggedIn: true, userInfo: user })
    } else {
      this.setData({ isLoggedIn: false, userInfo: { nickname: '', avatar: '' } })
    }
  },

  // ===== 登录相关 =====
  onShowLogin() { this.setData({ showLoginModal: true, loginName: '', loginPwd: '' }) },
  onCloseLogin() { this.setData({ showLoginModal: false }) },
  onShowRegister() { this.setData({ showLoginModal: false, showRegisterModal: true, regName: '', regPwd: '', regPwd2: '' }) },
  onCloseRegister() { this.setData({ showRegisterModal: false }) },
  onSwitchToLogin() { this.setData({ showRegisterModal: false, showLoginModal: true }) },

  onLoginNameInput(e: any) { this.setData({ loginName: e.detail.value }) },
  onLoginPwdInput(e: any) { this.setData({ loginPwd: e.detail.value }) },
  onRegNameInput(e: any) { this.setData({ regName: e.detail.value }) },
  onRegPwdInput(e: any) { this.setData({ regPwd: e.detail.value }) },
  onRegPwd2Input(e: any) { this.setData({ regPwd2: e.detail.value }) },

  stopProp() {},

  // 注册
  async onRegister() {
    const { regName, regPwd, regPwd2 } = this.data
    if (!regName.trim()) { wx.showToast({ title: '请输入昵称', icon: 'none' }); return }
    if (regName.trim().length < 2) { wx.showToast({ title: '昵称至少2个字符', icon: 'none' }); return }
    if (!regPwd) { wx.showToast({ title: '请输入密码', icon: 'none' }); return }
    if (regPwd.length < 4) { wx.showToast({ title: '密码至少4位', icon: 'none' }); return }
    if (regPwd !== regPwd2) { wx.showToast({ title: '两次密码不一致', icon: 'none' }); return }

    try {
      wx.showLoading({ title: '注册中...' })
      const res = await apiRegister({ nickname: regName.trim(), password: regPwd })
      wx.hideLoading()

      const user = res.user
      wx.setStorageSync('currentUser', user)

      this.setData({
        showRegisterModal: false,
        isLoggedIn: true,
        userInfo: user,
      })
      wx.showToast({ title: '注册成功', icon: 'success' })
      this.loadData()
    } catch (err: any) {
      wx.hideLoading()
      wx.showToast({ title: err || '注册失败', icon: 'none' })
    }
  },

  // 登录
  async onLogin() {
    const { loginName, loginPwd } = this.data
    if (!loginName.trim()) { wx.showToast({ title: '请输入昵称', icon: 'none' }); return }
    if (!loginPwd) { wx.showToast({ title: '请输入密码', icon: 'none' }); return }

    try {
      wx.showLoading({ title: '登录中...' })
      const res = await apiLogin({ nickname: loginName.trim(), password: loginPwd })
      wx.hideLoading()

      const user = res.user
      wx.setStorageSync('currentUser', user)

      this.setData({
        showLoginModal: false,
        isLoggedIn: true,
        userInfo: user,
      })
      wx.showToast({ title: '登录成功', icon: 'success' })
      this.loadData()
    } catch (err: any) {
      wx.hideLoading()
      wx.showToast({ title: err || '登录失败', icon: 'none' })
    }
  },

  // 退出登录
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('currentUser')
          this.setData({ isLoggedIn: false, userInfo: { nickname: '', avatar: '' } })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  },

  // ===== 数据加载 =====
  loadData() {
    const myRecipes = getUserRecipes()
    const favIds = getFavorites()

    const allRecipes = [...recipes, ...aiRecipes, ...myRecipes]
    const favoriteRecipes = favIds
      .map((id: string) => allRecipes.find(r => r.id === id))
      .filter((r: any) => r)

    this.setData({
      myRecipes: myRecipes,
      favoriteRecipes: favoriteRecipes,
      stats: {
        recipeCount: myRecipes.length,
        favoriteCount: favIds.length,
      },
    })
  },

  onTabChange(e: any) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onRecipeTap(e: any) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/recipe-detail/recipe-detail?id=' + id })
  },

  onUploadTap() {
    if (!this.data.isLoggedIn) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      this.setData({ showLoginModal: true })
      return
    }
    wx.navigateTo({ url: '/pages/upload/upload' })
  },

  onClearData() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有本地数据吗？（不会清除账号信息）',
      success: (res) => {
        if (res.confirm) {
          const users = wx.getStorageSync('registeredUsers')
          const currentUser = wx.getStorageSync('currentUser')
          wx.clearStorageSync()
          if (users) wx.setStorageSync('registeredUsers', users)
          if (currentUser) wx.setStorageSync('currentUser', currentUser)
          this.loadData()
          wx.showToast({ title: '已清除', icon: 'success' })
        }
      }
    })
  },
  onAuditTap() {
    wx.navigateTo({ url: '/pages/admin/audit/audit' })
  },
})
