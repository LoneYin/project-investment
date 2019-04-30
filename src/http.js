import axios from 'axios'
import encrypt from './utils/encrypt'
import { getCookie } from './utils/cookie'
import { Message } from 'element-ui'
import router from './router'
import store from './store'

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
		} else if (res.data.status === 3) {
			return Promise.reject(res)
		} else if (res.data.status === 4) {
			return res.data
		} else {
			Message.error(res.data.message)
			return Promise.reject(res)
		}
	},
	err => {
		if (err.response.status == 401) {
			store.commit('SET_LOGOUT')
			Message.error('请登录')
			router.push({ path: '/login' })
		} else if (err.response.status === 500) {
			router.push({ path: '/error' })
		}
		// return Promise.reject(err.response)
	}
)
