// app.ts - 味道星球食谱小程序
import { request } from './utils/request';

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 连通性测试
    console.log('[Backend] Testing connection...');
    request('/health', 'GET')
      .then((res: any) => {
        console.log('[Backend] Connection successful:', res.message);
      })
      .catch((err: any) => {
        console.warn('[Backend] Connection failed. Make sure Python server is running.', err);
      });


    // 登录
    wx.login({
      success: res => {
        console.log('[味道星球] 登录成功', res.code)
      },
    })
  },
})