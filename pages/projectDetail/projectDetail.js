Page({
    data: {
      project: {}
    },
    onLoad: function (options) {
      const projectId = options.id;
      // 假设以下是一个硬编码的推荐项目列表
      const recommendations = [
        {
          id: 1,
          title: '机器学习入门项目',
          description: '探索机器学习的基本概念，包括数据预处理、模型训练和评估。',
          participants: 20,
          total: 50,
          views: 150,
          deadline: '2024-12-31',
          status: '进行中'
        },
        {
          id: 2,
          title: '移动应用开发',
          description: '学习如何使用 React Native 开发跨平台移动应用。',
          participants: 15,
          total: 40,
          views: 120,
          deadline: '2024-11-30',
          status: '即将开始'
        },
        {
          id: 3,
          title: 'Web 开发实战',
          description: '使用 HTML, CSS, JavaScript 构建响应式网站。',
          participants: 30,
          total: 60,
          views: 200,
          deadline: '2024-10-31',
          status: '进行中'
        },
        {
          id: 4,
          title: '网络安全基础',
          description: '了解网络安全的基础知识，包括加密、身份验证和防御机制。',
          participants: 10,
          total: 30,
          views: 80,
          deadline: '2024-09-30',
          status: '已完成'
        }
      ];
      const project = recommendations.find(item => item.id === parseInt(projectId));
      if (project) {
        this.setData({ project });
      } else {
        wx.showToast({
          title: '未找到项目',
          icon: 'none'
        });
      }
    },
    goBack: function () {
      wx.navigateBack({
        delta: 1 // 返回上一级页面
      });
    },
    joinProject: function () {
      wx.showModal({
        title: '提示',
        content: '您确定要参与这个项目吗？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            // 这里可以添加参与项目的逻辑
            wx.showToast({
              title: '参与成功',
              icon: 'success',
              duration: 2000
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  });