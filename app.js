// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
App({
  onLaunch() {
    // 初始化云开发环境
    wx.cloud.init({
      env: 'zzll-6gzo76eh88841a67',
      traceUser: true,
    });
  },
});