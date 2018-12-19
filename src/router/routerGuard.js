import store from '@/store'
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'

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
    }
}