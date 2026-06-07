/**
 * 封装微信小程序网络请求工具
 */

const BASE_URL = 'http://127.0.0.1:5000/api';

/**
 * 基础请求函数
 * @param url 接口路径
 * @param method 请求方法
 * @param data 请求数据
 */
export const request = (url: string, method: 'GET' | 'POST' = 'GET', data: any = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          console.error(`[API Error] ${url}:`, res);
          reject(res);
        }
      },
      fail: (err) => {
        console.error(`[Network Error] ${url}:`, err);
        wx.showToast({
          title: '无法连接后端服务',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};
