import { GET_ROUND_LIST, GET_INDUSTRY_LIST, GET_AREA_LIST, GET_PROJECTS_LIST, GET_INVESTORS_LIST, CLEAR_PROJECTS_LIST, GET_TAGS_LIST, GET_USER_TAGS } from '../mutations-types'
import { getData, postData } from "@/http"

export default {
    state: {
        // 删选器
        roundList: undefined,
        industryList: undefined,
        areaList: undefined,
        // 标签
        tagsList: undefined,
        userTags: undefined,
        // 项目
        projectsList: undefined,
        projectsListPages: {
            total: 1,
            currentPage: 1
        },
        // 创业者
        investorsList: undefined,
        investorsListPages: {
            total: 1,
            currentPage: 1
        }
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
            if (payload.current_page == 1) {
                state.projectsList = [...payload.data]
            } else {
                state.projectsList = [...state.projectsList, ...payload.data]
            }
            state.projectsListPages.total = payload.pages
            state.projectsListPages.currentPage = payload.current_page
        },
        [CLEAR_PROJECTS_LIST](state) {
            state.projectsList = []
            state.projectsListPages = {
                total: 1,
                currentPage: 1
            }
        },
        [GET_INVESTORS_LIST](state, payload) {
            if (payload.current_page == 1) {
                state.investorsList = [...payload.data]
            } else {
                state.investorsList = [...state.investorsList, ...payload.data]
            }
            state.investorsListPages.total = payload.pages
            state.investorsListPages.currentPage = payload.current_page
        },
        [GET_TAGS_LIST](state, payload) {
            state.tagsList = [...payload]
        },
        [GET_USER_TAGS](state, payload) {
            state.userTags = [...payload]
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
        async getTagsList({ commit }) {
            const res = await getData('/index/tag/tags')
            res.data && commit('GET_TAGS_LIST', res.data)
        },
        async getUserTags({ commit }) {
            const res = await getData('/index/tag/userTags')
            res.data && commit('GET_USER_TAGS', res.data)
        },

        //  更新projectsList
        async getProjectsList({ commit }, params) {
            const res = await postData('/index/project/index', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getOptimalProjectsList({ commit }, params) {
            const res = await postData('/index/project/isOptimal', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getNewProjectsList({ commit }, params) {
            const res = await postData('/index/project/newPeoject', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getNewExperienceProjects({ commit }, params) {
            const res = await postData('/index/project/newExperience', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getFinancingProjects({ commit }, params) {
            if (params) {
                params.is_financing = 1
            } else {
                params = { is_financing: 1 }
            }
            const res = await postData('/index/project/index', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getStarProjects({ commit }, params) {
            if (params) {
                params.is_collection = 1
            } else {
                params = { is_collection: 1 }
            }
            const res = await postData('/index/project/index', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },
        async getTagsProjects({commit}, params) {
            if (params) {
                params.tags = 1
            } else {
                params = { tags: 1 }
            }
            const res = await postData('/index/project/index', params)
            res.data && commit('GET_PROJECTS_LIST', res.data)
        },

        //  更新investorsList
        async getInvestorsList({ commit }, params) {
            const res = await postData('/index/investor/index', params)
            res.data && commit('GET_INVESTORS_LIST', res.data)
        }
    }
}