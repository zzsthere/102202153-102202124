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
    savedNickname: '', // 保存后的昵称，用于显示加粗效果
    school: '', // 学校信息
    major: '', // 专业信息
  },

  // 选择头像
  chooseAvatar() {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success: (res) => {
        const sourceType = res.tapIndex === 0? 'album': 'camera';
        wx.chooseImage({
          sourceType: [sourceType],
          sizeType: ['original', 'compressed'],
          success: (res) => {
            console.log('选择的图片路径：', res.tempFilePaths[0]);
            this.uploadAvatar(res.tempFilePaths[0]);
          },
          fail: (err) => {
            console.error('选择图片失败：', err);
          }
        });
      },
      fail: (err) => {
        console.error('显示选择菜单失败：', err);
      }
    });
  },

  // 上传头像
  uploadAvatar(filePath) {
    const uploadTask = wx.uploadFile({
      url: 'http://localhost:3000/upload',
      filePath: filePath,
      name: 'file',
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          console.log('上传头像成功，服务器响应数据：', data);
          if (data.success) {
            this.setData({ avatarUrl: data.url });
            wx.showToast({ title: '上传成功', icon:'success' });
          } else {
            this.handleUploadError();
          }
        } catch (error) {
          console.error('JSON解析错误：', error);
          this.handleUploadError();
        }
      },
      fail: () => {
        this.handleUploadError();
      },
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
      },
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
    // 准备要发送的数据，包括学校和专业信息
    const dataToSend = {
      avatarUrl: this.data.avatarUrl,
      identity: this.data.identity,
      nickname: this.data.nickname,
      bio: this.data.bio,
      school: this.data.school,
      major: this.data.major
    };

    wx.request({
      url: 'http://localhost:3000/save',
      method: 'POST',
      data: dataToSend,
      success: (res) => {
        try {
          console.log('保存用户信息成功，服务器响应数据：', res.data);
          if (res.data.success) {
            // 保存成功后，将昵称保存到(savedNickname)用于加粗显示
            this.setData({ saveStatus: '信息保存成功！', savedNickname: this.data.nickname });
            setTimeout(() => {
              this.setData({ saveStatus: '', savedNickname: '' });
              wx.reload();
            }, 2000);
          } else {
            this.setData({ saveStatus: res.data.message });
            setTimeout(() => {
              this.setData({ saveStatus: '' });
            }, 3000);
          }
        } catch (error) {
          console.error('JSON解析错误或其他错误：', error);
          this.setData({ saveStatus: '网络错误，请稍后重试' });
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
      },
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
  },

  // 输入学校
  onSchoolInput(e) {
    this.setData({ school: e.detail.value });
  },

  // 输入专业
  onMajorInput(e) {
    this.setData({ major: e.detail.value });
  },

  // 输入简介（textarea）
  onBioTextareaInput(e) {
    this.setData({ bio: e.detail.value });
  }
});