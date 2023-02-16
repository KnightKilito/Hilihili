// 密码验证
export const pwdCheck = async (rule, value, callback) => {
    let reg = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~@#$%*-+=:,\?[]{}]).{6,16}$/
    if (value.length < 6) {
        this.changeFlag = 2;
        return callback(new Error('密码不能少于6位！'));
    } else if (value.length > 16) {
        this.changeFlag = 2;
        return callback(new Error('密码最长不能超过16位！'));
    } else if (!reg.test(value)) {
        this.changeFlag = 2;
        return callback(new Error('密码输入有误，请检查格式是否正确！'));
    } else {
        this.changeFlag = 1;
        callback()
    }
};
// 重复密码验证
export const pwdAgainCheck = async (rule, value, callback) => {
    if (value.length < 1) {
        this.changeAgainFlag = 2;
        return callback(new Error('重复密码不能为空！'));
    } else if (this.formValidate.password != this.formValidate.againPassword) {
        this.changeAgainFlag = 2;
        return callback(new Error('两次输入密码不一致！'));
    } else {
        this.changeAgainFlag = 1;
        callback()
    }
};
// 是否邮箱
export const validateEMail = async (rule, value, callback) => {
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱地址'));
        } else {
            callback();
        }
    }
};
// 账号校验
export const validateUsername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
        callback(new Error('账号必须为6-20位字母和数字组合'))
    } else {
        callback()
    }
};
//将数据的数据调用controller验证是否存在
export function checkDay(rule, value, callback) {
    selectDay(value).then(response => {
      const code = response.data.code;
      console.log(code);
      if (code == 500) {//数据已存在
        callback(new Error('该数据已存在'));
      } else {
        callback();
      }
    })
}
// 是否手机号码
export function validatePhone(rule, value, callback) {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    }
};

