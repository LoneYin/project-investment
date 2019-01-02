import store from '@/store'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'
import { postData } from '@/http'

export default {
    confirmLogout(to, from, next) {
        MessageBox.confirm('您将会退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const loadingInstance = Loading.service({ fullscreen: true })
            store.dispatch('logout').then(() => {
                Message({
                    message: "退出登陆成功",
                    type: "success"
                });
                loadingInstance.close()
                next({ name: "index" })
            })
        }).catch(() => {
            next(false)
        })
    },
    qqLogin(to, from, next) {
        const secret = to.fullPath.substring(24)
        postData('/index/login', {
            secret
        }).then(
                res => {
                    Message.success('QQ登陆成功')
                    store.commit('SET_LOGIN_STATUS', res.data)
                    store.dispatch('getCurrentUserData')
                    next({ path: '/' })
                },
                err => {
                    console.log(err)
                    Message.success('QQ登陆失败')
                    next({ path: '/login' })
            }
        )
    }
}