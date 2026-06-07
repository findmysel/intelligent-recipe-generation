// utils/auth.ts - 登录验证工具
// 提供统一的登录检查和提示逻辑

export interface LoginCheckResult {
  isLoggedIn: boolean
  user: { nickname: string; avatar: string } | null
}

// 检查用户是否已登录
export function checkLoginStatus(): LoginCheckResult {
  const user = wx.getStorageSync('currentUser')
  return {
    isLoggedIn: !!user,
    user: user || null
  }
}

// 验证用户是否登录，未登录则显示提示并返回 false
export function requireLogin(showModal: boolean = false): boolean {
  const { isLoggedIn, user } = checkLoginStatus()
  if (!isLoggedIn) {
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 2000
    })
    // 如果需要显示登录弹窗，可以在这里触发
    // 注意：弹窗显示需要在 Page 实例中调用，这里只提示
    return false
  }
  return true
}

// 获取当前登录用户的昵称（未登录返回空字符串）
export function getCurrentUserName(): string {
  const user = wx.getStorageSync('currentUser')
  return user ? user.nickname : ''
}
