
import { GET_ADVERTISEMENT_LIST, GET_DAILY_PROJECTS_LIST, GET_HOT_PROJECTS_LIST } from '../mutations-types'
import { getData } from '@/http'

const store = {
    state: {
        advertisementList: undefined,
        dailyProjectsList: undefined,
        hotProjectsList: undefined
    },
    mutations: {
        [GET_ADVERTISEMENT_LIST](state, payload) {
            state.advertisementList = {...payload.data}
        },
        [GET_DAILY_PROJECTS_LIST](state, payload) {
            state.dailyProjectsList = [...payload.data]
        },
        [GET_HOT_PROJECTS_LIST](state, payload) {
            state.hotProjectsList = [...payload.data]
        }
    },
    actions: {
        async getAdvertisementList({ commit }) {
            const res = await getData('/index/news/index')
            res.data && commit('GET_ADVERTISEMENT_LIST', res.data)
        },
        async getDailyProjectsList({ commit }) {
            const res = await getData('/index/project/dayProject')
            res.data && commit('GET_DAILY_PROJECTS_LIST', res.data)
        },
        async getHotProjectsList({ commit }) {
            const res = await getData('/index/project/dayProject')
            res.data && commit('GET_HOT_PROJECTS_LIST', res.data)
        }
    }
}

export default store