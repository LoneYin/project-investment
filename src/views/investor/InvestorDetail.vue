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

				<el-card class="no-border investor-detail-section" id="personalResume">
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

				<el-card class="no-border investor-detail-section" id="investmentCase">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-suitcase"></i>
						投资案例
						<span>{{(investmentCases && investmentCases.counts) > 0 ? `(${investmentCases.counts})` : '' }}</span>
					</div>
					<div class="section-content">
						<template v-if="investmentCases && investmentCases.data.length > 0">
							<p>
								<span
									:key="item.id"
									class="industry-tag"
									v-for="item in investmentCases.industry"
								>{{item.name}}</span>
							</p>
							<el-row>
								<el-col
									:key="item.project_id"
									:span="12"
									class="case-item"
									v-for="item in investmentCases.data"
								>
									<el-card @click.native="toProjectDetail(item.project_id)" class="scroll no-border">
										<el-row class="case-item-title">
											<el-col :span="6" class="case-item-logo">
												<img :src="item.logo" alt>
											</el-col>
											<el-col :offset="1" :span="14">
												<p class="case-item-name">{{item.name}}</p>
												<p class="case-item-summary">{{item.summary}}</p>
											</el-col>
										</el-row>
										<div class="case-item-experiences" v-if="item.experience.length > 0">
											<el-row :key="index" class="experience-item" v-for="(subItem, index) in item.experience">
												<el-col :span="6" class="experience-item-time">{{subItem.time}}</el-col>
												<el-col :span="16" class="experience-item-round">
													<div class="circle">
														<span class="circle-inside"></span>
													</div>
													<p>{{subItem.experience_name}}</p>
												</el-col>
											</el-row>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</template>
						<p v-else>暂无个人履历信息</p>
					</div>
				</el-card>
			</div>
			<div
				:style="{ width: navbarWidth ? `${navbarWidth}px` : 'auto', display: showFixedBar ? 'block' : 'none' }"
				class="absolute-navbar"
			>
				<el-card class="no-border absolute-navbar-container">
					<div class="header-navbar">
						<el-tabs @tab-click="handleTabsClick" v-model="currentName">
							<el-tab-pane label="投资偏好" name="investmentPreference"></el-tab-pane>
							<el-tab-pane label="个人履历" name="personalResume"></el-tab-pane>
							<el-tab-pane label="投资案例" name="investmentCase"></el-tab-pane>
						</el-tabs>
					</div>
				</el-card>
			</div>
		</template>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import scroll from '@/utils/scroll'
export default {
	data() {
		return {
			init: false,
			currentName: 'investmentPreference',
			navbarWidth: undefined,
			showFixedBar: false,
			anchorArr: [],
			anchorNameArr: [],
			scrollLock: false
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
		toProjectDetail(id) {
			this.$router.push({
				path: `/project/detail/${id}`
			})
		},
		handleTabsClick(tab) {
			if (!this.scrollLock) {
				this.scrollLock = true
				scroll.scrollTo(tab.name, () => {
					setTimeout(() => {
						this.scrollLock = false
					}, 50)
				})
			} else {
				this.$message.warning('切换过于频繁')
			}
		},
		onScroll() {
			if (!this.navbarWidth) {
				this.navbarWidth = document.querySelector(
					'.investor-detail'
				).offsetWidth
			}

			const container = document.querySelector('.el-main')

			if (container.scrollTop > 116 && !this.showFixedBar) {
				this.showFixedBar = true
			} else if (container.scrollTop <= 116 && this.showFixedBar) {
				this.showFixedBar = false
			}

			if (!this.scrollLock) {
				if (container.scrollTop < this.anchorArr[1]) {
					this.currentName = this.anchorNameArr[0]
				} else if (
					container.scrollTop >= this.anchorArr[1] &&
					container.scrollTop <= this.anchorArr[2]
				) {
					this.currentName = this.anchorNameArr[1]
				} else {
					this.currentName = this.anchorNameArr[2]
				}
			}
		},
		initAnchorArr() {
			const sectionList = document.querySelectorAll(
				'.investor-detail-section'
			)
			Array.from(sectionList).forEach(item => {
				this.anchorArr.push(item.offsetTop)
				this.anchorNameArr.push(item.id)
			})
		}
	},
	created() {
		this.init = true
		this.getInvestorDetail(this.investorId).finally(() => {
			this.init = false
		})
		this.getInvestmentCases(this.investorId)
	},
	mounted() {
		this.$nextTick(() => {
			document
				.querySelector('.el-main')
				.addEventListener('scroll', this.onScroll, false)
		})
		setTimeout(() => {
			this.initAnchorArr()
		}, 1000)
	},
	destroyed() {
		document
			.querySelector('.el-main')
			.removeEventListener('scroll', this.onScroll, false)
		this.$store.commit('CLEAR_INVESTOR_DETAIL')
	}
}
</script>

<style>
</style>
