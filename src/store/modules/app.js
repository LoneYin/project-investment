import { SET_LOGIN_STATUS, SET_LOGOUT, GET_CURRENT_USER_DATA, SET_AUTO_LOGIN } from '../mutations-types'
import { setCookie, delCookie } from '@/utils/cookie'
import { getData } from '@/http'

export default {
    state: {
        loginStatus: false,
        accessUserToken: '',
        currentUserData: undefined
    },
    mutations: {
        [SET_LOGIN_STATUS](state, data) {
            state.loginStatus = true
            state.accessUserToken = data['access-user-token']
            setCookie('access-user-token', data['access-user-token'], data.token_time_out)
        },
        [SET_LOGOUT](state) {
            state.loginStatus = false
            state.accessUserToken = ''
            state.currentUserData = undefined
            delCookie('access-user-token')
        },
        [GET_CURRENT_USER_DATA](state, payload) {
            state.currentUserData = { ...payload.data }
        },
        [SET_AUTO_LOGIN](state, token) {
            state.loginStatus = true
            state.accessUserToken = token
        }
    },
    actions: {
        async getCurrentUserData({ commit }) {
            const res = await getData('/index/user/userData')
            res.data && commit('GET_CURRENT_USER_DATA', res.data)
        },
        logout({ commit }) {
            commit('SET_LOGOUT')
        }
    }
}