import { GET_INVESTOR_DETAIL, CLEAR_INVESTOR_DETAIL, GET_INVESTMENT_CASES } from "../mutations-types";
import { getData } from '@/http'
export default {
    state: {
        investorDetail: undefined,
        investmentCases: undefined,
    },
    mutations: {
        [GET_INVESTOR_DETAIL](state, payload) {
            state.investorDetail = { ...payload }
        },
        [CLEAR_INVESTOR_DETAIL](state) {
            state.investorDetail = undefined
            state.investmentCases = undefined
        },
        [GET_INVESTMENT_CASES](state, payload) {
            state.investmentCases = { ...payload }
        }
    },
    actions: {
        async getInvestorDetail({ commit }, investorId) {
            const res = await getData(`/index/investor/${investorId}`)
            res.data && commit('GET_INVESTOR_DETAIL', res.data)
        },
        async getInvestmentCases({ commit }, investorId) {
            const res = await getData('/index/investor/investmentCase', { id: investorId })
            res.data && commit('GET_INVESTMENT_CASES', res.data)
        }
    }
}