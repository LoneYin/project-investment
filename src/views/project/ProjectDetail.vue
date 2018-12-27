<template>
	<div class="project-detail" v-loading="init">
		<template v-if="projectDetail">
			<el-card class="no-border project-detail-header">
				<div class="header-container">
					<el-row class="header-title">
						<el-col :span="6">
							<div class="project-logo">
								<img :src="projectDetail.logo" alt>
							</div>
						</el-col>
						<el-col :span="18" class="project-text">
							<p class="project-info">
								<span class="text-name text-ellipsis" :title="projectDetail.name">{{projectDetail.name}}</span>
								<span class="text-industry">{{projectDetail.industry.name}}</span>
								<span class="text-dot"></span>
								<i class="el-icon-location"></i>
								<span class="text-area">{{projectDetail.area.name}}</span>
								<a :href="projectDetail.related_links" class="text-link">
									<span>官网</span>
								</a>
							</p>
							<p
								:title="projectDetail.synopsis"
								class="project-summary text-ellipsis"
							>{{projectDetail.synopsis}}</p>
							<p class="project-tags">
								<span v-for="item in projectDetail.tags" :key="item.tag_id">
									<i class="el-icon-fa-tags">   {{item.tag_name}}</i>
								</span>
							</p>
						</el-col>
					</el-row>
					<div class="header-navbar">
						<el-tabs @tab-click="handleTabsClick" v-model="currentName">
							<el-tab-pane label="项目介绍" name="projectIntroduce"></el-tab-pane>
							<el-tab-pane label="融资历史" name="investmentHistory"></el-tab-pane>
							<el-tab-pane label="创始团队" name="projectTeam"></el-tab-pane>
							<el-tab-pane label="项目数据" name="projectData"></el-tab-pane>
							<el-tab-pane label="相关新闻" name="projectNews"></el-tab-pane>
							<el-tab-pane label="类似项目" name="similarProjects"></el-tab-pane>
						</el-tabs>
					</div>
				</div>
			</el-card>
			<div class="project-detail-main">
				<el-card class="no-border prject-detail-section" id="projectIntroduce">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-file-text-o"></i>项目介绍
					</div>
					<div class="section-content">
						<template v-if="projectDetail.detail">
							<div v-html="projectDetail.detail"></div>
						</template>
						<p v-else>暂无项目介绍</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="investmentHistory">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-money"></i>融资历史
					</div>
					<div class="section-content">
						<template v-if="projectDetail.experience && projectDetail.experience.length > 0">
							<div
								:key="index"
								class="section-history-item"
								v-for="(item, index) in projectDetail.experience"
							>
								<div class="history-time">{{ item.create_time }}</div>
								<div class="history-line">
									<div class="circle">
										<div class="inside-circle"></div>
									</div>
								</div>
								<div class="history-info">
									<div class="info-angle"></div>
									<span class="info-round-name">{{ item.experience_name }}</span>
									<span class="info-round-detail">
										<p class="info-round-detail-row">
											<span class="info-round-price-title">融资金额</span>
											<span class="info-round-price">{{ item.financing_price }} 人民币</span>
										</p>
										<p class="info-round-detail-row">
											<span class="info-round-investor">投资方</span>
											<a class="info-round-investor-name" href="#">IMBA资本</a>
										</p>
									</span>
									<!-- <span class="history-info-round-link">
                                    <a :href="item.new_url"><i class="el-icon-document"></i></a>
									</span>-->
								</div>
							</div>
						</template>
						<p v-else>暂无融资历史</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectTeam">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-users"></i>创始团队
					</div>
					<div class="section-content">
						<div class="section-team-table" v-if="projectDetail.team && projectDetail.team.length > 0">
							<el-table :data="projectDetail.team" style="width: 90%; margin: 0 auto;">
								<el-table-column label="姓名" prop="real_name" width="180"></el-table-column>
								<el-table-column label="职位" prop="position" width="180"></el-table-column>
								<el-table-column label="介绍" prop="introduce"></el-table-column>
							</el-table>
						</div>
						<p v-else>暂无创始团队信息</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectData">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-bar-chart"></i>项目数据
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectNews">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-newspaper-o"></i>相关新闻
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="similarProjects">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-briefcase"></i>类似项目
					</div>
					<div class="section-content"></div>
				</el-card>
			</div>
			<div
				:style="{ width: navbarWidth ? `${navbarWidth}px` : 'auto', display: showFixedBar ? 'block' : 'none' }"
				class="absolute-navbar"
			>
				<el-card class="no-border absolute-navbar-container">
					<div class="header-navbar">
						<el-tabs @tab-click="handleTabsClick" v-model="currentName">
							<el-tab-pane label="项目介绍" name="projectIntroduce"></el-tab-pane>
							<el-tab-pane label="融资历史" name="investmentHistory"></el-tab-pane>
							<el-tab-pane label="创始团队" name="projectTeam"></el-tab-pane>
							<el-tab-pane label="项目数据" name="projectData"></el-tab-pane>
							<el-tab-pane label="相关新闻" name="projectNews"></el-tab-pane>
							<el-tab-pane label="类似项目" name="similarProjects"></el-tab-pane>
						</el-tabs>
					</div>
				</el-card>
			</div>
		</template>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import scroll from '@/utils/scroll'

export default {
	data() {
		return {
			init: false,
			currentName: 'projectIntroduce',
			navbarWidth: undefined,
			showFixedBar: false,
			anchorArr: [],
			anchorNameArr: [],
			scrollLock: false
		}
	},
	props: {
		projectId: String
	},
	computed: {
		...mapState({
			projectDetail: state => state.project.projectDetail
		})
	},
	methods: {
		...mapActions(['getProjectDetail']),

		handleTabsClick(tab) {
			this.scrollLock = true
			scroll.scrollTo(tab.name, () => {
				setTimeout(() => {
					this.scrollLock = false
				}, 150)
			})
		},
		onScroll() {
			if (!this.navbarWidth) {
				this.navbarWidth = document.querySelector(
					'.project-detail'
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
				} else if (
					container.scrollTop >= this.anchorArr[2] &&
					container.scrollTop <= this.anchorArr[3]
				) {
					this.currentName = this.anchorNameArr[2]
				} else if (
					container.scrollTop >= this.anchorArr[3] &&
					container.scrollTop <= this.anchorArr[4]
				) {
					this.currentName = this.anchorNameArr[3]
				} else if (
					container.scrollTop >= this.anchorArr[4] &&
					container.scrollTop <= this.anchorArr[5]
				) {
					this.currentName = this.anchorNameArr[4]
				} else {
					this.currentName = this.anchorNameArr[5]
				}
			}
		},
		initAnchorArr() {
			const sectionList = document.querySelectorAll(
				'.prject-detail-section'
			)
			Array.from(sectionList).forEach(item => {
				this.anchorArr.push(item.offsetTop)
				this.anchorNameArr.push(item.id)
			})
		}
	},
	created() {
		this.init = true
		this.getProjectDetail(this.projectId).finally(() => {
			this.init = false
		})
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
		this.$store.commit('CLEAR_PROJECT_DETAIL')
	}
}
</script>

