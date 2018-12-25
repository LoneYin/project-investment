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
    },
    synopsis(rule, value, callback) {
        const reg = /^[\u4e00-\u9fa50-9A-Za-z]+$/ // 只能输入中英文和数字
        if (value.length <= 5) {
            callback(new Error('可以描述的更加详细一些(不得少于5个字)'))
        } else if (value.length > 30) {
            callback(new Error('一句话简介请限制在30字以内'))
        } else {
            if (!reg.test(value)) {
                callback(new Error('一句话简介中请不要含有标点符号和特殊字符'))
            } else {
                callback()
            }   
        }
    },
    maxLength(length) {
        return (rule, value, callback) => {
            if (value.length > length) {
                callback(new Error(`最大输入长度不能超过${length}个字节`))
            } else {
                callback()
            }
        }
    }
}