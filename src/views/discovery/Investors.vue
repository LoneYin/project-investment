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
		getMoreInvestors(page, scrollTop) {
			const params = {
				...this.selectorsData,
				page
			}
			this.moreLoading = true
			setTimeout(() => {
				this.getInvestorsList(params).finally(() => {
					this.moreLoading = false
					document.querySelector('.el-main').scrollTo(0, scrollTop)
				})
			}, 1000)
		}
	},
	created() {
		if (!this.investorsList) {
			this.tableInitLoading = true
			this.getInvestorsList().finally(() => {
				this.tableInitLoading = false
			})
		}
	}
}
</script>

