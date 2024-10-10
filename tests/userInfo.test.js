const path = require('path');
const { describe, it, expect } = require('miniprogram-simulate');

describe('个人信息输入功能测试', () => {
    it('onNicknameInput 方法应正确设置昵称', () => {
        // 模拟页面实例
        const page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                nickname: '',
                bio: '',
                school: '',
                major: '',
            },
        };

        const event = { detail: { value: 'Test Nickname' } };
        page.onNicknameInput(event);

        expect(page.data.nickname).toBe('Test Nickname');
    });

    it('onBioInput 方法应正确设置简介', () => {
        const page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                nickname: '',
                bio: '',
                school: '',
                major: '',
            },
        };

        const event = { detail: { value: 'Test Bio' } };
        page.onBioInput(event);

        expect(page.data.bio).toBe('Test Bio');
    });

    it('onSchoolInput 方法应正确设置学校', () => {
        const page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                nickname: '',
                bio: '',
                school: '',
                major: '',
            },
        };

        const event = { detail: { value: 'Test School' } };
        page.onSchoolInput(event);

        expect(page.data.school).toBe('Test School');
    });

    it('onMajorInput 方法应正确设置专业', () => {
        const page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                nickname: '',
                bio: '',
                school: '',
                major: '',
            },
        };

        const event = { detail: { value: 'Test Major' } };
        page.onMajorInput(event);

        expect(page.data.major).toBe('Test Major');
    });

    it('onBioTextareaInput 方法应正确设置简介（textarea）', () => {
        const page = {
            setData: function (data) {
                this.data = data;
            },
            data: {
                nickname: '',
                bio: '',
                school: '',
                major: '',
            },
        };

        const event = { detail: { value: 'Test Bio Textarea' } };
        page.onBioTextareaInput(event);

        expect(page.data.bio).toBe('Test Bio Textarea');
    });
});