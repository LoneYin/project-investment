import { GET_PROJECT_DETAIL, CLEAR_PROJECT_DETAIL, SET_MORE_DETAIL_INFOS, GET_SIMILAR_PROJECTS, CHANGE_COLLECT_STATUS } from "../mutations-types";
import { getData, postData } from '@/http'
export default {
    state: {
        projectDetail: undefined,
        moreDetailInfos: undefined,
        similarProjects: undefined,
        similarProjectsMeta: undefined,
        isCollect: 0
    },
    mutations: {
        [GET_PROJECT_DETAIL](state, payload) {
            state.projectDetail = { ...payload }
            state.isCollect = payload.is_collect
        },
        [CLEAR_PROJECT_DETAIL](state) {
            state.projectDetail = undefined
            state.similarProjects = undefined
            state.isCollect = 0
        },
        [SET_MORE_DETAIL_INFOS](state, payload) {
            state.moreDetailInfos = { ...payload }
        },
        [GET_SIMILAR_PROJECTS](state, payload) {
            if (payload.current_page == 1) {
                state.similarProjects = [...payload.data]
                state.similarProjectsMeta = {
                    tags: [...payload.tags],
                    pages: payload.pages
                }
            } else {
                state.similarProjects = [...state.similarProjects, ...payload.data]
            }
        },
        [CHANGE_COLLECT_STATUS](state, status) {
            state.isCollect = status
        }
    },
    actions: {
        async getProjectDetail({ rootState, commit}, projectId) {
            const res = await getData(`/index/project/${projectId}`)
            res.data && commit('GET_PROJECT_DETAIL', res.data)
            if (res.data && res.data.more && rootState.app.currentUserData && rootState.app.currentUserData.authentication == 2) {
                const more = await getData(`/index/project/more`, { project_id: projectId })
                more.data && commit('SET_MORE_DETAIL_INFOS', more.data)
            }
        },
        async getSimilarProjects({ commit }, params) {
            const res = await postData('/index/project/similarProject', params)
            res.data && commit('GET_SIMILAR_PROJECTS', res.data)
        }
    }
}