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
								<span class="text-name text-ellipsis">{{projectDetail.name}}</span>
								<span class="text-industry">{{projectDetail.industry.name}}</span>
								<span class="text-dot"></span>
								<i class="el-icon-location"></i>
								<span class="text-area">{{projectDetail.area.name}}</span>
								<a :href="projectDetail.related_links" class="text-link">
									<span>官网</span>
								</a>
							</p>
							<p class="project-summary text-ellipsis">{{projectDetail.synopsis}}</p>
						</el-col>
					</el-row>
					<div class="header-navbar">
						<el-tabs @tab-click="handleTabsClick" v-model="currentName">
							<el-tab-pane label="项目介绍" name="projectIntroduce"></el-tab-pane>
							<el-tab-pane label="产品服务" name="projectService"></el-tab-pane>
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
					<div slot="header">
						<i class="el-icon-fa-file-text-o"></i>项目介绍
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectService">
					<div slot="header">
						<i class="el-icon-fa-server"></i>产品服务
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="investmentHistory">
					<div slot="header">
						<i class="el-icon-fa-money"></i>融资历史
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectTeam">
					<div slot="header">
						<i class="el-icon-fa-users"></i>创始团队
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectData">
					<div slot="header">
						<i class="el-icon-fa-bar-chart"></i>项目数据
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectNews">
					<div slot="header">
						<i class="el-icon-fa-newspaper-o"></i>相关新闻
					</div>
					<div class="section-content"></div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="similarProjects">
					<div slot="header">
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
							<el-tab-pane label="产品服务" name="projectService"></el-tab-pane>
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
            
			if (container.scrollTop > 136 && !this.showFixedBar) {
				this.showFixedBar = true
			} else if (container.scrollTop <= 136 && this.showFixedBar) {
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
				} else if (
					container.scrollTop >= this.anchorArr[5] &&
					container.scrollTop <= this.anchorArr[6]
				) {
					this.currentName = this.anchorNameArr[5]
				} else {
					this.currentName = this.anchorNameArr[6]
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
			console.log(this.anchorArr, this.anchorNameArr)
		}
	},
	props: {
		projectId: String
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
	}
}
</script>

<style lang="less">
.project-detail {
	height: 100%;
	position: relative;
	.el-card__body {
		padding: 0;
	}
	.project-detail-header {
		width: 100%;
		background: #ffffff;
	}
	.header-container {
		width: 60%;
		margin: 0 auto;
		.header-title {
			width: 500px;
			padding-top: 40px;
		}
	}
	.project-logo {
		margin: 0 auto;
		width: 82px;
		height: 82px;
		border-radius: 42px;
		padding: 1px;
		border: 1px solid #e5e5e5;
		img {
			width: 80px;
			height: 80px;
			border-radius: 39px;
			margin-top: 1px;
		}
	}
	.project-text {
		padding: 14px 0;
		height: 86px;
		text-align: left;
		span {
			display: inline-block;
		}
		.text-name {
			font-size: 20px;
			margin-right: 10px;
			max-width: 100px;
			position: relative;
			top: 5px;
		}
		.text-industry,
		.text-area {
			font-size: 15px;
			color: #666;
		}
		.text-dot {
			margin: 5px 10px;
			width: 2px;
			height: 2px;
			line-height: 21px;
			background: #666;
		}
		i {
			color: #666;
			margin-right: 5px;
		}
		.text-link {
			position: relative;
			top: -3px;
			margin-left: 15px;
			display: inline-block;
			width: 32px;
			height: 18px;
			line-height: 18px;
			text-align: center;
			background: #6ba2fc;
			color: #ffffff;
			font-size: 12px;
			border-radius: 4px;
		}
		.project-summary {
			color: #999;
			margin-top: 5px;
			width: 100%;
		}
	}
	.header-navbar {
		height: 40px;
		margin-top: 10px;
	}
	.el-tabs__nav-wrap::after {
		background-color: #ffffff;
	}

	.project-detail-main {
		width: 60%;
		margin: 0 auto;
		padding-top: 20px;
	}
	.prject-detail-section {
		margin-bottom: 20px;
		.el-card__header {
			padding: 0 20px;
			text-align: left;
			line-height: 40px;
			i {
				margin-right: 10px;
			}
		}
		.section-content {
			min-height: 200px;
		}
	}
	.absolute-navbar {
		position: fixed;
		width: calc(100% - 180px);
		top: 60px;
		left: 180px;
		z-index: 100;
		background: #ffffff;
		.header-navbar {
			width: 60%;
			height: 40px;
			margin: 0 auto;
		}
	}
}
</style>
