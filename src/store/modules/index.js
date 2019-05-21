import { getData } from '@/http'
import {
    GET_ADVERTISEMENT_LIST,
    GET_DAILY_PROJECTS_LIST,
    GET_HOT_PROJECTS_LIST,
    GET_AUTHENTICATED_USERS_LIST,
    GET_RECOMMENDED_INVESTORS_LIST,
    GET_RECENT_PROJECT_LIST
} from '../mutations-types'

export default {
    state: {
        advertisementList: undefined,
        dailyProjectsList: undefined,
        hotProjectsList: undefined,
        authenticatedUsersList: undefined,
        consultInvestorsList: undefined,
        activeInvestorsList: undefined,
        popularInvestorsList: undefined,
        recentProjectsList: undefined
    },
    mutations: {
        [GET_ADVERTISEMENT_LIST](state, payload) {
            state.advertisementList = { ...payload }
        },
        [GET_DAILY_PROJECTS_LIST](state, payload) {
            state.dailyProjectsList = [...payload.data]
        },
        [GET_HOT_PROJECTS_LIST](state, payload) {
            state.hotProjectsList = [...payload.data]
        },
        [GET_RECENT_PROJECT_LIST](state, payload) {
            state.recentProjectsList = [...payload.data]
        },
        [GET_AUTHENTICATED_USERS_LIST](state, payload) {
            state.authenticatedUsersList = [...payload]
        },
        [GET_RECOMMENDED_INVESTORS_LIST](state, payload) {
            state.consultInvestorsList = [...payload.consultInvestorsList]
            state.activeInvestorsList = [...payload.activeInvestorsList]
            state.popularInvestorsList = [...payload.popularInvestorsList]
        }
    },
    actions: {
        async getAdvertisementList({ commit }) {
            const res = await getData('/index/news/index')
            res.data && commit('GET_ADVERTISEMENT_LIST', res.data)
        },
        async getDailyProjectsList({ commit }) {
            const res = await getData('/index/project/dayProject', {
                page_size: 6
            })
            res.data && commit('GET_DAILY_PROJECTS_LIST', res.data)
        },
        async getHotProjectsList({ commit }) {
            const res = await getData('/index/project/hotProject', {
                page_size: 6
            })
            res.data && commit('GET_HOT_PROJECTS_LIST', res.data)
        },
        async getRecentProjectsList({ commit }) {
            const res = await getData('/index/project/index_new', {
                page_size: 6
            })
            res.data && commit('GET_RECENT_PROJECT_LIST', res.data)
        },
        async getAuthenticatedUsersList({ commit }) {
            const res = await getData('/index/business')
            res.data && commit('GET_AUTHENTICATED_USERS_LIST', res.data)
        },
        async getRecommendedInvestorsList({ commit }) {
            const res = await Promise.all([
                getData('/index/investor/getStatus', {
                    consult: 1,
                    page_size: 4
                }),
                getData('/index/investor/getStatus', {
                    active: 1,
                    page_size: 4
                }), 
                getData('/index/investor/getStatus', {
                    have_the_call: 1,
                    page_size: 4
                })
            ])
            res && res.length == 3 && commit('GET_RECOMMENDED_INVESTORS_LIST', {
                consultInvestorsList: res[0].data.data,
                activeInvestorsList: res[1].data.data,
                popularInvestorsList: res[2].data.data
            })
        }
    }
}