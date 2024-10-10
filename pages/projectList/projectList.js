Page({
  data: {
    projectName: '',
    description: '',
    descriptionLength: 0,
    requirements: '',
    recruitCount: '',
    recruitCountError: '',
    requirementError: '',
    date: '',
    showConfirm: false,
  },

  onLoad: function() {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.setDate(currentDate.getDate() + 7));
    this.setData({
      date: nextWeek.toISOString().split('T')[0],
    });
  },

  onNameInput(e) {
    this.setData({ projectName: e.detail.value });
  },

  onDescriptionInput(e) {
    const value = e.detail.value;
    if (value.length > 200) {
      this.setData({ description: value.substring(0, 200), descriptionLength: 200 });
    } else {
      this.setData({ description: value, descriptionLength: value.length });
    }
  },

  onRequirementInput(e) {
    const value = e.detail.value;
    const isValid = value.split('\n').every(req => req.startsWith('-'));
    
    this.setData({ 
      requirements: value,
      requirementError: isValid ? '' : '请按照格式输入项目需求，例如：- 需求 1'
    });
  },

  onRecruitCountInput(e) {
    const value = e.detail.value;
    if (!/^\d+$/.test(value) || value <= 0) {
      this.setData({ recruitCount: '', recruitCountError: '请输入正整数' });
    } else {
      this.setData({ recruitCount: value, recruitCountError: '' });
    }
  },

  onDateChange(e) {
    this.setData({ date: e.detail.value });
  },

  showConfirmDialog() {
    this.setData({ showConfirm: true });
  },

  confirmPublish() {
    // TODO: Add API request to publish the project
    wx.showToast({ title: '项目发布成功', icon: 'success' });
    this.setData({ showConfirm: false });
  },

  cancelPublish() {
    this.setData({ showConfirm: false });
  },

  showInfo() {
    wx.showModal({
      title: '项目名称提示',
      content: '项目名称应简洁明了，突出项目核心内容，建议长度为 8 - 20 个字符，避免使用特殊符号。',
    });
  }
});
