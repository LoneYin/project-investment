import { GET_PROJECT_DETAIL } from "../mutations-types";
import {getData} from '@/http'
export default {
    state: {
        projectDetail: undefined
    },
    mutations: {
        [GET_PROJECT_DETAIL](state, payload) {
            state.projectDetail = {...payload}
        }
    },
    actions: {
        async getProjectDetail({ commit }, projectId) {
            const res = await getData(`/index/project/${projectId}`)
            res.data && commit('GET_PROJECT_DETAIL', res.data)
        }
    }
}