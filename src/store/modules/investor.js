import { GET_INVESTOR_DETAIL, CLEAR_INVESTOR_DETAIL } from "../mutations-types";
import {getData} from '@/http'
export default {
    state: {
        investorDetail: undefined
    },
    mutations: {
        [GET_INVESTOR_DETAIL](state, payload) {
            state.investorDetail = {...payload}
        },
        [CLEAR_INVESTOR_DETAIL](state) {
            state.investorDetail = undefined
        }
    },
    actions: {
        async getInvestorDetail({ commit }, investorId) {
            const res = await getData(`/index/investor/${investorId}`)
            res.data && commit('GET_INVESTOR_DETAIL', res.data)
        }
    }
}