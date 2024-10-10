Page({
  data: {
    notificationPreferences: {} // 存储通知偏好设置状态
  },

  onLoad() {
    // 初始化数据，假设从模拟数据获取用户通知偏好设置，实际应从存储或后端获取
    const defaultPreferences = {
      '项目更新通知': true,
      '成员加入通知': true,
      '聊天消息通知': false
    };
    this.setData({ notificationPreferences: defaultPreferences });
  },

  getDescription(notificationType) {
    // 根据通知类型返回描述
    switch (notificationType) {
      case '项目更新通知':
        return '您将收到关于您参与项目的重要更新信息，如项目进度变更、任务分配等，可能每周发送1 - 2次。';
      case '成员加入通知':
        return '您会收到团队成员加入的通知，方便您及时了解团队动态。';
      case '聊天消息通知':
        return '当有新的聊天消息时，您将收到通知。';
      default:
        return '';
    }
  },

  handleNotificationPreferenceChange(event) {
    const { value, name } = event.detail;
    // 更新用户通知偏好设置
    this.setData({
      [`notificationPreferences.${name}`]: value.includes(name)
    });
  },

  handleSaveNotificationPreferences() {
    // 这里可以添加实际保存用户通知偏好设置到后端或本地存储的逻辑
    wx.showToast({
      title: '已保存',
      icon: 'success'
    });
  }
});