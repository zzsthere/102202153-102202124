Page({  
  data: {  
    phoneNumber: '',  
    password: '',  
    code: '',  
    phoneNumberError: '',  
    passwordError: '',  
    countdown: 0  
  },  
  
  onPhoneNumberInput(e) {  
    const phoneNumber = e.detail.value;  
    const phoneNumberError = this.validatePhoneNumber(phoneNumber);  
    this.setData({  
      phoneNumber: phoneNumber,  
      phoneNumberError: phoneNumberError  
    });  
  },  
  
  validatePhoneNumber(phoneNumber) {  
    const regex = /^1[3-9]\d{9}$/;  
    return regex.test(phoneNumber) ? '' : '手机号码格式错误，请重新输入';  
  },  
  
  onPasswordInput(e) {  
    const password = e.detail.value;  
    const passwordError = password.length < 6 ? '密码长度至少为6位' : '';  
    this.setData({  
      password: password,  
      passwordError: passwordError  
    });  
  },  
  
  onGetCode() {  
    const { phoneNumber, phoneNumberError } = this.data;  
    if (phoneNumberError) {  
      return;  
    }  
    this.setData({  
      countdown: 60,  
      code: ''  
    });  
    this.startCountdown();  
    // 发送验证码请求（这里可以添加代码）  
  }
});
