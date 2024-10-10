Page({
  data: {
    recommendations: [
      {
        id: 1,
        title: '机器学习入门项目',
        description: '探索机器学习的基本概念，包括数据预处理、模型训练和评估。',
        participants: 20,
        total: 50,
        views: 150,
        deadline: '2024-12-31',
        status: '进行中'
      },
      {
        id: 2,
        title: '移动应用开发',
        description: '学习如何使用 React Native 开发跨平台移动应用。',
        participants: 15,
        total: 40,
        views: 120,
        deadline: '2024-11-30',
        status: '即将开始'
      },
      {
        id: 3,
        title: 'Web 开发实战',
        description: '使用 HTML, CSS, JavaScript 构建响应式网站。',
        participants: 30,
        total: 60,
        views: 200,
        deadline: '2024-10-31',
        status: '进行中'
      },
      {
        id: 4,
        title: '网络安全基础',
        description: '了解网络安全的基础知识，包括加密、身份验证和防御机制。',
        participants: 10,
        total: 30,
        views: 80,
        deadline: '2024-09-30',
        status: '已完成'
      }
    ],
    filteredRecommendations: [],
    searchSuggestions: [], // 搜索建议数据
    searchQuery: "", // 当前搜索框的内容
    debounceTimeout: null, // 防抖定时器
    iconPathForMy: 'images/wode.png',
    iconPathForProjects: 'images/xiangmu.png',
    iconPathForChat: 'images/xiaoxi.png',
    iconPathForNotifications: 'images/tongzhi.png'
  },

  onSearchInput: function (e) {
    const query = e.detail.value;
    this.setData({ searchQuery: query });

    // 清除现有的定时器
    if (this.data.debounceTimeout) {
      clearTimeout(this.data.debounceTimeout);
    }

    // 设置新的定时器
    this.setData({ debounceTimeout: setTimeout(() => {
      this.fetchSearchSuggestions(query);
    }, 300) }); // 300ms 后执行搜索建议请求
  },

  onSearchBlur: function () {
    // 失去焦点时隐藏搜索建议
    this.setData({ searchSuggestions: [] });
  },

  fetchSearchSuggestions: function (query) {
    if (!query) {
      this.setData({ searchSuggestions: [] });
      return;
    }
    // 这里可以调用 API 获取搜索建议，这里使用静态数据示例
    const suggestions = this.data.recommendations.map(item => item.title).filter((item) =>
      item.includes(query)
    );
    this.setData({ searchSuggestions: suggestions });
  },

  onSuggestTap: function (e) {
    const suggestion = e.currentTarget.dataset.name;
    this.setData({
      searchQuery: suggestion,
      searchSuggestions: []
    });
  },

  onSearchTap: function () {
    const query = this.data.searchQuery;
    if (!query) {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
      });
      return;
    }
    // 这里可以调用 API 获取搜索结果，这里使用静态数据示例
    const filteredRecommendations = this.data.recommendations.filter((item) =>
      item.title.includes(query) || item.description.includes(query)
    );
    this.setData({ filteredRecommendations });
  },

  onLoad: function () {
    // 页面加载时复制推荐项目数组到 filteredRecommendations
    this.setData({
      filteredRecommendations: this.data.recommendations
    });
  },

  goToDetail: function (e) {
    // 跳转到项目页面
    const projectId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/projectDetail/projectDetail?id=${projectId}`
    });
  },

  // 以下是 tabBar 页面的跳转方法
  goToProjects: function () {
    wx.switchTab({
      url: '/pages/projects/projects',
    });
  },

  goToChat: function () {
    wx.switchTab({
      url: '/pages/chat/chat',
    });
  },

  goToNotifications: function () {
    wx.switchTab({
      url: '/pages/notification/notification',
    });
  },

  goTouserInfo() {
    wx.switchTab({
      url: '/pages/userInfo/userInfo',
    });
  }
});