import { GET_ROUND_LIST, GET_INDUSTRY_LIST, GET_AREA_LIST, GET_PROJECTS_LIST } from '../mutations-types'
import { getData, postData } from "@/http"

export default {
    state: {
        roundList: undefined,
        industryList: undefined,
        areaList: undefined,
        projectsList: undefined,
    },
    mutations: {
        [GET_ROUND_LIST](state, payload) {
            state.roundList = [...payload]
        },
        [GET_INDUSTRY_LIST](state, payload) {
            state.industryList = [...payload]
        },
        [GET_AREA_LIST](state, payload) {
            state.areaList = [...payload]
        },
        [GET_PROJECTS_LIST](state, payload) {
            state.projectsList = [...payload.data]
        }
    },
    actions: {
        async getRoundList({ commit }) {
            const res = await getData('/index/index/round')
            res.data && commit('GET_ROUND_LIST', res.data)
        },
        async getIndustryList({ commit }) {
            const res = await getData('/index/index/industry')
            res.data && commit('GET_INDUSTRY_LIST', res.data)
        },
        async getAreaList({ commit }) {
            const res = await getData('/index/index/area')
            res.data && commit('GET_AREA_LIST', res.data)
        },
        async getProjectsList({ commit }, params) {
            const res = await postData('/index/project/index', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        }
    }
}