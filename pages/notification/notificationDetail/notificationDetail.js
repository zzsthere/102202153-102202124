Page({
  data: {
    notification: {}
  },

  onLoad( options ) {
    const notification = JSON.parse( options.notification );
    this.setData({ notification });
  },

  handleMarkAsRead() {
    // 这里可以添加实际将通知标记为已读的逻辑，例如调用后端接口
    wx.showToast({
      title: '已标记为已读',
      icon:'success'
    });
    // 然后可以返回到通知列表页面
    wx.navigateBack();
  },

  handleBack() {
    wx.navigateBack();
  },

  handleViewRelatedProject() {
    // 这里可以添加跳转到相关项目详情页面的逻辑，假设项目详情页面路径为 /pages/projectDetail/projectDetail
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${ this.data.notification.relatedProjectId }`
    });
  }
});