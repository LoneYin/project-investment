<template>
	<div class="investors">
		<InvestorSelectors @refreshList="getInvestors"/>
		<InvestorTable
			:defaultData="investorsList"
			:initLoading="tableInitLoading"
			:moreLoading="moreLoading"
			:pagination="investorsListPages"
			@loadMore="getMoreInvestors"
			ref="investorTable"
		/>
	</div>
</template>

<script>
import InvestorSelectors from '@/components/investor/InvestorSelectors.vue'
import InvestorTable from '@/components/investor/InvestorTable.vue'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'investors',
	data() {
		return {
			selectorsData: {},
			tableInitLoading: false,
			moreLoading: false
		}
	},
	components: {
		InvestorSelectors,
		InvestorTable
	},
	computed: {
		...mapState({
			investorsList: state => state.discovery.investorsList,
			investorsListPages: state => state.discovery.investorsListPages
		})
	},
	methods: {
		...mapActions(['getInvestorsList']),
		getInvestors(data) {
			this.selectorsData = { ...data }
			this.getInvestorsList({
				...data,
				page: 1
			}).finally(() => {
				this.$refs.investorTable.page = 1
			})
		},
		getMoreInvestors(page) {
			const params = {
				...this.selectorsData,
				page
			}
			this.moreLoading = true
			this.getInvestorsList(params).finally(() => {
				this.moreLoading = false
			})
		}
	},
	created() {
		this.tableInitLoading = true
        this.getInvestorsList().finally(() => {
            this.tableInitLoading = false
        })
	}
}
</script>

