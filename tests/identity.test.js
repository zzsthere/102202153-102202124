const path = require('path');
const { describe, it, expect } = require('miniprogram-simulate');

describe('选择身份功能测试', () => {
  it('选择身份成功', () => {
    // 模拟页面实例
    const page = {
      setData: function (data) {
        this.data = data;
      },
      data: {
        identity: null,
      },
    };

    // 模拟事件对象
    const event = {
      detail: {
        value: 'student',
      },
    };

    // 调用被测试的方法
    page.selectIdentity(event);

    // 检查身份是否正确设置
    expect(page.data.identity).toBe('student');
  });
});