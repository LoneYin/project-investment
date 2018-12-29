import axios from 'axios'
import encrypt from './utils/encrypt'
import { getCookie } from './utils/cookie'
import { Message } from 'element-ui'
import router from './router'

export const server = 'http://api.ir8.vip'
export const authKey = 'asjs82iqos0ad823'

export const getData = (url, params) => {
    const sign = encrypt(params, authKey)
    return axios.get(server + url, {
        params,
        headers: {
            sign,
            'access-user-token': getCookie('access-user-token') || ''
        }
    })
}

export const postData = (url, params, contentType) => {
    const sign = encrypt(params, authKey)
    return axios.post(server + url, params, {
        headers: {
            sign,
            'access-user-token': getCookie('access-user-token') || '',
            'Content-Type': contentType || 'application/json; charset=utf-8'
        }
    })
}

export const delData = (url, params) => {
    const sign = encrypt(params, authKey)
    return axios.delete(server + url, {
        params,
        headers: {
            sign,
            'access-user-token': getCookie('access-user-token') || ''
        }
    })
}

export const putData = (url, params) => {
    const sign = encrypt(params, authKey)
    return axios.put(server + url, params, {
        headers: {
            sign,
            'access-user-token': getCookie('access-user-token') || ''
        }
    })
}


axios.interceptors.response.use(
	res => {
        if (res.data.status === 1) {
            return res.data
        } else {
            Message.error(res.data.message)
            return Promise.reject(res)
        }
	},
	err => {
        if (err.response.status == 401) {
            Message.error('请您先登录')
            router.push({path: '/login'})
        }
		return Promise.reject(err.response)
	}
)