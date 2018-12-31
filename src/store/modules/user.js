import { GET_INFORMATION_LIST } from '../mutations-types'
import { getData } from '@/http'
export default {
    state: {
        informationList: undefined
    },
    mutations: {
        [GET_INFORMATION_LIST](state, payload) {
            this.state.informationList = [...payload]
        }
    },
    actions: {
        async getInformationList({ commit }) {
            const res = await getData('/index/notify')
            debugger
            res.data && commit('GET_INFORMATION_LIST', res.data)
        }
    }
}