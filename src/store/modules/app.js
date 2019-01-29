import { SET_LOGIN_STATUS, SET_LOGOUT, GET_CURRENT_USER_DATA, SET_AUTO_LOGIN, SET_RECENT_MOBILE, SET_ACTIVE_INDEX, SET_LOADING_STATUS, GET_ARTICLE_DETAIL, CLEAR_ARTICLE_DETAIL, CLEAR_CURRENT_USER_DATA } from '../mutations-types'
import { setCookie, delCookie } from '@/utils/cookie'
import { getData } from '@/http'

export default {
    state: {
        loginStatus: false,
        accessUserToken: '',
        currentUserData: undefined,
        recentMobile: '',
        activeIndex: '/',
        fullScreenLoading: false,
        articleDetail: undefined
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
            state.currentUserData = { ...payload }
        },
        [CLEAR_CURRENT_USER_DATA](state) {
            state.currentUserData = undefined
        },
        [SET_AUTO_LOGIN](state, token) {
            state.loginStatus = true
            state.accessUserToken = token
        },
        [SET_RECENT_MOBILE](state, mobile) {
            if (mobile) {
                state.recentMobile = mobile
            } else {
                state.recentMobile = ''
            }
        },
        [SET_ACTIVE_INDEX](state, index) {
            state.activeIndex = index
        },
        [SET_LOADING_STATUS](state, status) {
            state.fullScreenLoading = status
        },
        [GET_ARTICLE_DETAIL](state, payload) {
            state.articleDetail = {...payload}
        },
        [CLEAR_ARTICLE_DETAIL](state) {
            state.articleDetail = undefined
        }
    },
    actions: {
        async getCurrentUserData({ commit }) {
            const res = await getData('/index/user/userData')
            res.data && commit('GET_CURRENT_USER_DATA', res.data)
        },
        async getArticleDetail({ commit }, id) {
            const res = await getData('/index/index/articleDetail', {id})
            res.data && commit('GET_ARTICLE_DETAIL', res.data) 
        },
        logout({ commit }) {
            commit('SET_LOGOUT')
        }
    }
}