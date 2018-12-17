import axios from 'axios'
import encrypt from './utils/encrypt'
import { getCookie } from './utils/cookie';

const server = 'http://api.dtai88.com'
const authKey = 'asjs82iqos0ad823'

export const getData = (url, params, withToken) => {
    const sign = encrypt(params, authKey)
    if (withToken) {
        return axios.get(server + url, {
            params,
            headers: {
                sign,
                'access-user-token': getCookie('access-user-token')
            }
        })
    } else {
        return axios.get(server + url, {
            params,
            headers: {
                sign
            }
        })
    }
}

export const postData = (url, params) => {
    const sign = encrypt(params, authKey)
    return axios.post(server + url, {
        params,
        headers: {
            sign,
            'access-user-token': getCookie('access-user-token')
        }
    })
}