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
    }
}