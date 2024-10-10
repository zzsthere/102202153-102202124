const app = getApp();

Page({
  data: {
    messages: [],
    inputValue: '',
    showEmojiPanel: false,
    emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅'],
    isLoading: false,
    hasMoreMessages: true,
  },

  onLoad() {
    this.loadMessages();
    // 不再直接连接后端服务器，而是准备调用云函数
  },

  loadMessages() {
    if (this.data.isLoading) return;
    this.setData({ isLoading: true });
    wx.cloud.callFunction({
      name: 'getMessages',
      success: (res) => {
        const newMessages = res.result;
        if (newMessages.length > 0) {
          this.setData({
            messages: [...this.data.messages,...newMessages],
            isLoading: false,
          });
        } else {
          this.setData({ isLoading: false, hasMoreMessages: false });
        }
      },
      fail: (err) => {
        console.error('获取消息失败:', err);
        this.setData({ isLoading: false });
      }
    });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    const { inputValue } = this.data;
    if (!inputValue) return;

    const message = {
      content: inputValue,
      timestamp: Date.now(),
      isSender: true,
    };

    this.addMessage(message);

    // 将消息发送到云函数
    wx.cloud.callFunction({
      name: 'socketFunction',
      data: {
        action: 'sendMessage',
        message: message,
      },
      success: (res) => {
        console.log('云函数调用成功：', res);
      },
      fail: (err) => {
        console.error('云函数调用失败：', err);
      },
    });

    this.setData({ inputValue: '' });

    // 添加自动回复逻辑
    const autoReplyMessage = {
      content: '[自动回复]您好，当前小程序还没正式启用哟~',
      timestamp: Date.now(),
      isSender: false,
    };
    this.addMessage(autoReplyMessage);
  },

  addMessage(message) {
    const newMessages = [...this.data.messages, message];
    this.setData({
      messages: newMessages,
    });
    const messageWrappers = newMessages.map((msg, index) => {
      return {
        style: `justify-content: ${msg.isSender? 'flex-end' : 'flex-start'};`
      };
    });
    this.setData({
      messages: newMessages.map((msg, index) => ({...msg, wrapperStyle: messageWrappers[index].style }))
    });
    this.scrollToBottom();
  },

  scrollToBottom() {
    const query = wx.createSelectorQuery();
    query.select('.chat-window').boundingClientRect();
    query.selectViewport().boundingClientRect();
    query.exec((rect) => {
      if (rect[0]) {
        this.setData({ scrollTop: rect[0].height });
      }
    });
  },

  showNotification(message) {
    wx.setTabBarBadge({
      index: 0,
      text: '1',
    });
  },

  loadMoreMessages() {
    if (!this.data.hasMoreMessages || this.data.isLoading) return;
    this.loadMessages();
  },

  openEmojiPanel() {
    this.setData({ showEmojiPanel:!this.data.showEmojiPanel });
  },

  insertEmoji(e) {
    const emoji = e.target.dataset.emoji;
    this.setData({ inputValue: this.data.inputValue + emoji });
  },

  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  },
});