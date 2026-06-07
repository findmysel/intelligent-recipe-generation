// pages/admin/audit/audit.ts
import { apiGetPendingRecipes, apiApproveRecipe } from '../../../utils/data'

Page({
  data: {
    pendingRecipes: [] as any[]
  },

  onLoad() {
    this.loadPending()
  },

  async loadPending() {
    try {
      wx.showLoading({ title: '加载中...' })
      const res = await apiGetPendingRecipes()
      this.setData({ pendingRecipes: res })
      wx.hideLoading()
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
  },

  async onApprove(e: any) {
    const id = e.currentTarget.dataset.id
    try {
      wx.showLoading({ title: '处理中...' })
      await apiApproveRecipe(id)
      wx.hideLoading()
      wx.showToast({ title: '审核已通过', icon: 'success' })
      this.loadPending() // 刷新列表
    } catch (err) {
      wx.hideLoading()
      wx.showToast({ title: '操作失败', icon: 'none' })
    }
  },

  onReject() {
    wx.showToast({ title: '已拒绝该申请', icon: 'none' })
    // 这里可以增加删除逻辑，暂只演示通过
  }
})
