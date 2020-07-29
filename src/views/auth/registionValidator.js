export default {

    validateUserName: (rule, value, callback) => {
        if (value === '') {
            callback(new Error('用户名不能为空'));
        } else if (!(/^[a-zA-Z]\w+/.test(value))) {
            callback(new Error('用户名(字母或数字，并以字母开头'));
        } else {
            callback();
        }
    },
    validatePhone: (rule, value, callback) => {
        //if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone)))
        if (!value || value == '') {
            callback(new Error('手机号码不能为空'));
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    },

    // validateEmail: (rule, value, callback) => {
    validateEmail: () => {

    },
    validateMsgCode: (rule, value, callback) => {
        if (!value || value == '') {
            callback(new Error('短信验证码不能为空'));
        } else {
            callback();
        }
    },


}