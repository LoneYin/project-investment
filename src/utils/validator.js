export default {
    password(rule, value, callback) {
        if (value.length > 5 && value.length < 25) {
            callback()
        } else {
            callback(new Error('密码须为6-24位'))
        }
    },
    mobile(rule, value, callback) {
        const reg = /^1(3|4|5|7|8)\d{9}$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('手机号格式不正确'))
        }
    },
    email(rule, value, callback) {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (reg.test(value)) {
            callback()
        } else {
            callback(new Error('邮箱格式不正确'))
        }
    }
}