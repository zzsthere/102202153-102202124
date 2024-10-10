const path = require('path');
const { describe, it, expect } = require('miniprogram-simulate');

describe('小程序页面功能测试', () => {
    let page;

    beforeAll(() => {
        // 模拟页面实例
        page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                messages: [],
                inputValue: '',
                showEmojiPanel: false,
                emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅'],
                isLoading: false,
                hasMoreMessages: true,
            },
        };
    });

    // 测试 onLoad 方法
    it('onLoad 方法应该加载消息', () => {
        // 模拟 callFunction 的成功响应
        const mockCallFunctionSuccess = jest.fn((config) => {
            if (config.name === 'getMessages') {
                return {
                    result: [
                        { content: 'Test message 1', timestamp: Date.now(), isSender: false },
                    ],
                };
            }
        });
        // 模拟 wx.cloud.callFunction
        wx.cloud.callFunction = mockCallFunctionSuccess;

        page.onLoad();

        expect(page.data.messages.length).toBeGreaterThan(0);
    });

    // 测试 loadMessages 方法成功情况
    it('loadMessages 方法成功加载更多消息', () => {
        page.data.isLoading = false;
        page.data.hasMoreMessages = true;

        // 模拟 callFunction 的成功响应
        const mockCallFunctionSuccess = jest.fn((config) => {
            if (config.name === 'getMessages') {
                return {
                    result: [
                        { content: 'Another test message', timestamp: Date.now(), isSender: false },
                    ],
                };
            }
        });
        // 模拟 wx.cloud.callFunction
        wx.cloud.callFunction = mockCallFunctionSuccess;

        page.loadMessages();

        expect(page.data.messages.length).toBeGreaterThan(0);
        expect(page.data.isLoading).toBe(false);
    });

    // 测试 loadMessages 方法没有更多消息情况
    it('loadMessages 方法在没有更多消息时正确处理', () => {
        page.data.isLoading = false;
        page.data.hasMoreMessages = true;

        // 模拟 callFunction 的空响应
        const mockCallFunctionEmpty = jest.fn((config) => {
            if (config.name === 'getMessages') {
                return { result: [] };
            }
        });
        // 模拟 wx.cloud.callFunction
        wx.cloud.callFunction = mockCallFunctionEmpty;

        page.loadMessages();

        expect(page.data.messages.length).toBe(0);
        expect(page.data.isLoading).toBe(false);
        expect(page.data.hasMoreMessages).toBe(false);
    });

    // 测试 onInput 方法
    it('onInput 方法应该更新输入值', () => {
        const event = { detail: { value: 'Test input' } };
        page.onInput(event);
        expect(page.data.inputValue).toBe('Test input');
    });

    // 测试 sendMessage 方法
    it('sendMessage 方法应该发送消息并添加自动回复', () => {
        page.data.inputValue = 'Test message to send';
        // 模拟 callFunction 的成功响应
        const mockCallFunctionSuccess = jest.fn((config) => {
            if (config.name === 'socketFunction') {
                return { result: 'Success' };
            }
        });
        // 模拟 wx.cloud.callFunction
        wx.cloud.callFunction = mockCallFunctionSuccess;

        page.sendMessage();

        expect(page.data.messages.length).toBeGreaterThan(0);
        expect(page.data.inputValue).toBe('');
    });

    // 测试 addMessage 方法
    it('addMessage 方法应该正确添加消息并设置样式', () => {
        const message = { content: 'Added message', timestamp: Date.now(), isSender: true };
        page.addMessage(message);

        expect(page.data.messages.length).toBeGreaterThan(0);
        expect(page.data.messages[page.data.messages.length - 1].wrapperStyle).toContain('justify-content: flex-end');
    });

    // 测试 scrollToBottom 方法
    it('scrollToBottom 方法应该设置正确的 scrollTop', () => {
        // 模拟 createSelectorQuery 和 exec 的行为
        const mockQuery = {
            select: jest.fn().mockReturnThis(),
            boundingClientRect: jest.fn().mockReturnValue({ height: 100 }),
            selectViewport: jest.fn().mockReturnThis(),
            exec: jest.fn((callback) => {
                callback([{ height: 200 }]);
            }),
        };
        wx.createSelectorQuery = jest.fn(() => mockQuery);

        page.scrollToBottom();

        expect(page.data.scrollTop).toBe(200);
    });

    // 测试 showNotification 方法
    it('showNotification 方法应该设置 tab bar badge', () => {
        const mockSetTabBarBadge = jest.fn();
        wx.setTabBarBadge = mockSetTabBarBadge;

        page.showNotification('Test notification');

        expect(mockSetTabBarBadge).toHaveBeenCalledWith({ index: 0, text: '1' });
    });

    // 测试 loadMoreMessages 方法
    it('loadMoreMessages 方法在有更多消息且不加载中时应加载消息', () => {
        page.data.hasMoreMessages = true;
        page.data.isLoading = false;

        // 模拟 callFunction 的成功响应
        const mockCallFunctionSuccess = jest.fn((config) => {
            if (config.name === 'getMessages') {
                return {
                    result: [
                        { content: 'More test message', timestamp: Date.now(), isSender: false },
                    ],
                };
            }
        });
        // 模拟 wx.cloud.callFunction
        wx.cloud.callFunction = mockCallFunctionSuccess;

        page.loadMoreMessages();

        expect(page.data.messages.length).toBeGreaterThan(0);
    });

    // 测试 openEmojiPanel 方法
    it('openEmojiPanel 方法应该切换 emoji 面板的显示状态', () => {
        page.data.showEmojiPanel = false;
        page.openEmojiPanel();
        expect(page.data.showEmojiPanel).toBe(true);

        page.openEmojiPanel();
        expect(page.data.showEmojiPanel).toBe(false);
    });

    // 测试 insertEmoji 方法
    it('insertEmoji 方法应该在输入框中插入 emoji', () => {
        const event = { target: { dataset: { emoji: '😀' } } };
        page.data.inputValue = 'Before emoji';
        page.insertEmoji(event);
        expect(page.data.inputValue).toBe('Before emoji😀');
    });

    // 测试 formatTimestamp 方法
    it('formatTimestamp 方法应该正确格式化时间戳', () => {
        const timestamp = Date.now();
        const formattedTime = page.formatTimestamp(timestamp);
        expect(formattedTime).toMatch(/\d{1,2}:\d{1,2}/);
    });
});