import { GET_PROJECT_DETAIL, CLEAR_PROJECT_DETAIL, SET_MORE_DETAIL_INFOS } from "../mutations-types";
import { getData } from '@/http'
export default {
    state: {
        projectDetail: undefined,
        moreDetailInfos: undefined
    },
    mutations: {
        [GET_PROJECT_DETAIL](state, payload) {
            state.projectDetail = { ...payload }
        },
        [CLEAR_PROJECT_DETAIL](state) {
            state.projectDetail = undefined
        },
        [SET_MORE_DETAIL_INFOS](state, payload) {
            state.moreDetailInfos = { ...payload }
        }
    },
    actions: {
        async getProjectDetail(store, projectId) {
            const { commit, rootState } = store
            const res = await getData(`/index/project/${projectId}`)
            res.data && commit('GET_PROJECT_DETAIL', res.data)
            if (res.data && res.data.more && rootState.app.currentUserData && rootState.app.currentUserData.authentication == 2) {
                const more = await getData(`/index/project/more`, { project_id: projectId })
                more.data && commit('SET_MORE_DETAIL_INFOS', more.data)
            }
        }
    }
}