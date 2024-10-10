// 模拟数据，实际应用中应从后端获取
const mockNotifications = [
  {
    id: 1,
    type: '项目通知',
    icon: 'folder',
    title: '项目文件更新',
    content: '项目中的重要文件已更新，请及时查看。',
    time: '2024-10-09 10:00',
    isRead: false,
    relatedProjectId: 1 // 假设与项目关联的ID
  },
  {
    id: 2,
    type: '审核通知',
    icon: 'magnifier',
    title: '审核通过',
    content: '您提交的项目审核已通过。',
    time: '2024-10-08 15:30',
    isRead: false,
    relatedProjectId: null
  },
  {
    id: 3,
    type: '成员通知',
    icon: 'person',
    title: '新成员加入',
    content: '团队有新成员加入，欢迎协作。',
    time: '2024-10-07 12:00',
    isRead: true,
    relatedProjectId: null
  }
];

const userNotificationPreferences = {
  // 初始化为用户默认的通知偏好设置，实际应用中应从存储或后端获取
  '项目更新通知': true,
  '成员加入通知': true,
  '聊天消息通知': false
};

Page({
  data: {
    notificationList: [],
    unreadCount: 0,
    showUnreadNotificationPopup: false
  },

  onLoad() {
    // 模拟获取通知列表，实际应用中应调用后端接口
    this.setData({ notificationList: mockNotifications });
    this.calculateUnreadCount();
    this.checkForUnreadNotificationsOnAppOpen();
  },

  calculateUnreadCount() {
    const unread = this.data.notificationList.filter(notification =>!notification.isRead );
    this.setData({ unreadCount: unread.length });
  },

  checkForUnreadNotificationsOnAppOpen() {
    // 这里可以添加逻辑检查用户打开小程序时是否有未读通知
    // 假设已经有未读通知，模拟显示提示框
    if (this.data.unreadCount > 0) {
      this.setData({ showUnreadNotificationPopup: true });
    }
  },

  handleUnreadNotificationPopupConfirm() {
    this.setData({ showUnreadNotificationPopup: false });
    // 跳转到通知中心页面（这里假设是当前页面）
    wx.navigateTo({
      url: '/pages/notification / notification'
    });
  },

  handleNotificationTap( event ) {
    const notificationId = event.currentTarget.dataset.id;
    const notification = this.data.notificationList.find( n => n.id === notificationId );
    // 标记通知为已读（这里只是模拟，实际应调用后端接口更新状态）
    notification.isRead = true;
    this.calculateUnreadCount();
    // 跳转到通知详情页面并传递通知数据
    wx.navigateTo({
      url: `/pages/notification/notificationDetail/notificationDetail?notification=${JSON.stringify(notification)}`
    });
  },

  // 以下是处理通知偏好设置的方法
  onShowNotificationPreferencePage() {
    // 跳转到通知偏好设置页面
    wx.navigateTo({
      url: '/pages/notification/notificationPreference/notificationPreference'
    });
  },

  handleNotificationPreferenceChange( event ) {
    const { name, value } = event.target.dataset;
    userNotificationPreferences[ name ] = value;
    // 这里可以添加保存用户通知偏好设置到后端或本地存储的逻辑
    console.log( 'Updated notification preferences:', userNotificationPreferences );
  },

  handleSaveNotificationPreferences() {
    // 模拟保存通知偏好设置成功的提示
    wx.showToast({
      title: '通知偏好设置已保存',
      icon:'success'
    });
    // 这里可以实际执行保存到后端或本地存储的操作
  }
});