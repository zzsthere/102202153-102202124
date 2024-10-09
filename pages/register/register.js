Page({  
  data: {  
    showLogin: true,  
    phone: '',  
    phoneError: false,  
    phoneErrorText: '请输入11位手机号码',  
    password: '',  
    passwordError: false,  
    code: '',  
    codeButtonText: '获取验证码',  
    codeCountdown: 0,  
    isCodeSending: false,  
  },  
  
  handlePhoneInput(e) {  
    const phone = e.detail.value;  
    const phoneErrorText = this.validatePhone(phone);  
    this.setData({  
      phone: phone,  
      phoneError: phoneErrorText ? true : false,  
      phoneErrorText: phoneErrorText,  
    });  
  },  
  
  validatePhone(phone) {  
    const regex = /^1[3-9]\d{9}$/;  
    return !regex.test(phone) ? '手机号码格式错误，请重新输入' : '';  
  },  
  
  handlePasswordInput(e) {  
    const password = e.detail.value;  
    this.setData({  
      password: password,  
      passwordError: password.length < 6,  
    });  
  },  
  
  getCode() {  
    if (this.data.isCodeSending) return;  
    const phone = this.data.phone;  
    if (!this.validatePhone(phone)) return;  
  
    this.setData({  
      isCodeSending: true,  
      codeButtonText: '60s',  
      codeCountdown: 60,  
    });  
  
    const interval = setInterval(() => {  
      const countdown = this.data.codeCountdown - 1;  
      if (countdown <= 0) {  
        clearInterval(interval);  
        this.setData({  
          isCodeSending: false,  
          codeButtonText: '重新获取验证码',  
        });  
      } else {  
        this.setData({  
          codeCountdown: countdown,  
          codeButtonText: `${countdown}s`,  
        });  
      }  
    }, 1000);  
  
    // 发送验证码请求（模拟）  
    wx.showToast({ title: '验证码发送成功', icon: 'success' });  
  },  
  
  login() {  
    if (this.data.phoneError || this.data.passwordError || this.data.isCodeSending) return;  
    // 发送登录请求（模拟）  
    wx.showToast({ title: '登录中...', icon: 'loading' });  
    setTimeout(() => {  
      wx.hideToast();  
      wx.showModal({  
        title: '登录成功',  
        content: '欢迎回来！',  
        showCancel: false,  
        success: (res) => {  
          if (res.confirm) {  
            // 跳转到其他页面或执行其他操作  
          }  
        }  
      });  
    }, 2000);  
  },  
  
  register() {  
    if (this.data.phoneError || this.data.passwordError || this.data.isCodeSending || !this.data.code) return;  
    // 发送注册请求（模拟）  
    wx.showToast({ title: '注册中...', icon: 'loading' });  
    setTimeout(() => {  
      wx.hideToast();  
      wx.showModal({  
        title: '注册成功',  
        content: '请登录您的账户！',  
        showCancel: false,  
        success: (res) => {  
          if (res.confirm) {  
            this.setData({ showLogin: true, showRegister: false });  
          }  
        }  
      });  
    }, 2000);  
  },  
  
  toggleForm() {  
    this.setData({  
      showLogin: !this.data.showLogin,  
      showRegister: !this.data.showRegister,  
    });  
  },  
});