<template>
	<div class="project-detail" v-loading="init"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
            init: false,
        }
	},
	props: {
		investorId: String
	},
	computed: {
		...mapState({
			investorDetail: state => state.investor.investorDetail
		})
	},
	methods: {
		...mapActions(['getInvestorDetail'])
	},
	created() {
		this.init = true
		this.getInvestorDetail(this.investorId).finally(() => {
			this.init = false
		})
	}
}
</script>

<style>
</style>
