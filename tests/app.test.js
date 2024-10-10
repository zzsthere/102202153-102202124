const path = require('path');
const { describe, it, expect } = require('miniprogram-simulate');

// 引入你的小程序的入口文件
const app = require(path.join(__dirname, '../../app'));

describe('小程序功能测试', () => {
    // 1. 测试消息发送功能
    it('发送消息成功', () => {
        const message = 'Hello';
        app.sendMessage(message);
        // 假设存在一个存储已发送消息的列表，检查消息是否在列表中
        expect(app.globalData.sentMessages).toContain(message);
    });

    // 2. 测试自动回复功能
    it('自动回复正确', () => {
        const question = 'How are you?';
        const reply = app.getAutoReply(question);
        // 根据你的实际自动回复逻辑预期回复内容
        expect(reply).toBe('I am fine. Thank you!');
    });

    // 3. 测试项目发布功能
    it('发布项目成功', () => {
        const projectData = { title: 'Test Project', description: 'This is a test project' };
        app.publishProject(projectData);
        // 假设存在已发布项目列表，检查项目是否在列表中
        expect(app.globalData.publishedProjects).toContain(projectData);
    });

    // 4. 测试通知偏好设置功能
    it('设置通知偏好成功', () => {
        const preferences = { enableEmailNotifications: true, enablePushNotifications: false };
        app.setNotificationPreferences(preferences);
        expect(app.globalData.notificationPreferences).toEqual(preferences);
    });

    // 5. 测试搜索功能
    it('搜索功能正确', () => {
        const keyword = 'test';
        const results = app.search(keyword);
        // 根据你的实际搜索逻辑预期结果
        expect(results.length).toBeGreaterThan(0);
    });

    // 6. 测试查看项目详情功能
    it('查看项目详情成功', () => {
        const projectId = 1;
        const projectDetails = app.getProjectDetails(projectId);
        // 根据你的实际逻辑预期项目详情不为空
        expect(projectDetails).not.toBeNull();
    });

    // 7. 测试个人信息填写功能
    it('填写个人信息成功', () => {
        const userInfo = { 昵称: 'John', 学校: 30 };
        app.fillPersonalInfo(userInfo);
        expect(app.globalData.userInfo).toEqual(userInfo);
    });
});