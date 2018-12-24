import { GET_PROJECT_DETAIL, CLEAR_PROJECT_DETAIL } from "../mutations-types";
import {getData} from '@/http'
export default {
    state: {
        projectDetail: undefined
    },
    mutations: {
        [GET_PROJECT_DETAIL](state, payload) {
            state.projectDetail = {...payload}
        },
        [CLEAR_PROJECT_DETAIL](state) {
            state.projectDetail = {}
        }
    },
    actions: {
        async getProjectDetail({ commit }, projectId) {
            const res = await getData(`/index/project/${projectId}`)
            res.data && commit('GET_PROJECT_DETAIL', res.data)
        }
    }
}