<template>
	<div class="investor-detail" v-loading="init">
		<template v-if="investorDetail">
			<el-card class="no-border investor-detail-header">
				<div class="header-container">
					<el-row class="header-title">
						<el-col :span="6">
							<div class="investor-portrait">
								<img :src="investorDetail.portrait" alt>
							</div>
						</el-col>
						<el-col :span="18" class="investor-text">
							<p class="investor-info">
								<span
									:title="investorDetail.real_name"
									class="text-name text-ellipsis"
								>{{investorDetail.real_name}}</span>
								<i class="el-icon-location"></i>
								<span class="text-area">{{investorDetail.area_name}}</span>
							</p>
							<p class="investor-info">
								<span class="text-position">{{investorDetail.position}}</span>
							</p>
						</el-col>
					</el-row>
					<div class="header-navbar">
						<el-tabs @tab-click="handleTabsClick" v-model="currentName">
							<el-tab-pane label="投资偏好" name="investmentPreference"></el-tab-pane>
							<el-tab-pane label="个人履历" name="personalResume"></el-tab-pane>
							<el-tab-pane label="投资案例" name="investmentCase"></el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-card>
			<div class="investor-detail-main">
				<el-card class="no-border investor-detail-section" id="investmentPreference">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-hand-o-right"></i>投资偏好
					</div>
					<div class="section-content">
						<template
							v-if="investorDetail.industry_name.length > 0 || investorDetail.round_name.length > 0"
						>
							<el-row v-if="investorDetail.industry_name.length > 0">
								<el-col :span="2" class="preference-title">关注行业</el-col>
								<el-col :span="18">
									<span :key="index" v-for="(item, index) in investorDetail.industry_name">{{item}}</span>
								</el-col>
							</el-row>
							<el-row v-if="investorDetail.round_name.length > 0">
								<el-col :span="2" class="preference-title">偏好轮次</el-col>
								<el-col :span="18" class="preference-list">
									<span :key="index" v-for="(item, index) in investorDetail.round_name">{{item}}</span>
								</el-col>
							</el-row>
						</template>
						<p v-else>暂无项目介绍</p>
					</div>
				</el-card>

				<el-card class="no-border investor-detail-section" id="investmentPreference">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-user-circle-o"></i>个人履历
					</div>
					<div class="section-content">
						<template v-if="investorDetail.resume">
							<div v-html="investorDetail.resume"></div>
						</template>
						<p v-else>暂无个人履历信息</p>
					</div>
				</el-card>

				<el-card class="no-border investor-detail-section" id="investmentPreference">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-suitcase"></i>
						投资案例
						<span>{{investmentCases.counts && investmentCases.counts > 0 && `(${investmentCases.counts})` }}</span>
					</div>
					<div class="section-content">
						<template
							v-if="investmentCases.data && investmentCases.data.length > 0"
						>
							<p>
								<span v-for="item in investmentCases.industry" :key="item.id" class="industry-tag">
									{{item.name}}
								</span>
							</p>
							<el-row>
								<el-col :span="12" v-for="item in investmentCases.data" :key="item.project_id" class="case-item">
									<el-card class="no-border">
										<el-row class="case-item-title">
											<el-col :span="6" class="case-item-logo">
												<img :src="item.logo" alt="">
											</el-col>
											<el-col :span="14" :offset="1">
												<p class="case-item-name">{{item.name}}</p>
												<p class="case-item-summary">{{item.summary}}</p>
											</el-col>
										</el-row>
									</el-card>
								</el-col>
							</el-row>
						</template>
						<p v-else>暂无个人履历信息</p>
					</div>
				</el-card>
			</div>
		</template>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			init: false,
			currentName: 'investmentPreference'
		}
	},
	props: {
		investorId: String
	},
	computed: {
		...mapState({
			investorDetail: state => state.investor.investorDetail,
			investmentCases: state => state.investor.investmentCases
		})
	},
	methods: {
		...mapActions(['getInvestorDetail', 'getInvestmentCases']),
		handleTabsClick(name) {
			console.log(name)
		}
	},
	created() {
		this.init = true
		this.getInvestorDetail(this.investorId).finally(() => {
			this.init = false
		})
		this.getInvestmentCases(this.investorId)
	}
}
</script>

<style>
</style>
