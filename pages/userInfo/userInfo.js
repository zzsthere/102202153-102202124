// userInfo.js
Page({
  data: {
    avatarUrl: '', // 头像URL
    identity: '', // 用户身份
    identities: ['教师', '学生'], // 身份选项
    uploadProgress: 0, // 上传进度
    showModal: false, // 确认保存模态框状态
    saveStatus: '', // 保存状态提示
    nickname: '', // 用户昵称
    bio: '', // 用户简介
  },

  // 选择头像
  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success: (res) => {
        const sourceType = res.tapIndex === 0 ? 'album' : 'camera';
        wx.chooseImage({
          sourceType: [sourceType],
          sizeType: ['original', 'compressed'],
          success: (res) => {
            this.uploadAvatar(res.tempFilePaths[0]);
          }
        });
      }
    });
  },

  // 上传头像
  uploadAvatar(filePath) {
    const uploadTask = wx.uploadFile({
      url: 'https://example.com/upload', // 替换为你的上传接口
      filePath: filePath,
      name: 'file',
      success: (res) => {
        const data = JSON.parse(res.data);
        if (data.success) {
          this.setData({ avatarUrl: data.url });
          wx.showToast({ title: '上传成功', icon: 'success' });
        } else {
          this.handleUploadError();
        }
      },
      fail: () => {
        this.handleUploadError();
      }
    });

    uploadTask.onProgressUpdate((res) => {
      this.setData({ uploadProgress: res.progress });
    });
  },

  // 处理上传错误
  handleUploadError() {
    wx.showModal({
      title: '提示',
      content: '上传头像失败，请检查网络或重新尝试',
      confirmText: '重新上传',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.chooseAvatar();
        }
      }
    });
  },

  // 选择身份
  selectIdentity(e) {
    const selectedIdentity = e.detail.value;
    this.setData({ identity: selectedIdentity });
  },

  // 保存用户信息
  saveUserInfo() {
    this.setData({ showModal: true });
  },

  // 确认保存
  confirmSave() {
    wx.request({
      url: 'https://example.com/save', // 替换为你的保存接口
      method: 'POST',
      data: {
        avatarUrl: this.data.avatarUrl,
        identity: this.data.identity,
        nickname: this.data.nickname,
        bio: this.data.bio,
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({ saveStatus: '信息保存成功！' });
          setTimeout(() => {
            this.setData({ saveStatus: '' });
            wx.reload(); // 刷新页面
          }, 2000);
        } else {
          this.setData({ saveStatus: res.data.message });
          setTimeout(() => {
            this.setData({ saveStatus: '' });
          }, 3000);
        }
      },
      fail: () => {
        this.setData({ saveStatus: '网络错误，请稍后重试' });
        setTimeout(() => {
          this.setData({ saveStatus: '' });
        }, 3000);
      }
    });
    this.setData({ showModal: false });
  },

  // 取消保存
  cancelSave() {
    this.setData({ showModal: false });
  },

  // 输入昵称
  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  // 输入简介
  onBioInput(e) {
    this.setData({ bio: e.detail.value });
  }
});
