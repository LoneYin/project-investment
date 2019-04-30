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
								<span :title="projectDetail.name" class="text-name text-ellipsis">{{projectDetail.name}}</span>
								<span class="text-industry">{{projectDetail.industry.name}}</span>
								<span class="text-dot"></span>
								<i class="el-icon-location"></i>
								<span class="text-area">{{projectDetail.area.name}}</span>
								<a
									v-if="projectDetail.official_website"
									:href="projectDetail.official_website"
									class="text-link"
									target="_blank"
								>
									<span>官网</span>
								</a>
							</p>
							<p
								:title="projectDetail.synopsis"
								class="project-summary text-ellipsis"
							>{{projectDetail.synopsis}}</p>
							<p class="project-tags">
								<span :key="item.tag_id" v-for="item in projectDetail.tags">
									<i class="el-icon-fa-tags">&nbsp;{{item.tag_name}}</i>
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
						<template v-if="projectDetail.summary || projectDetail.more">
							<div class="introduce-item" v-if="projectDetail.summary">
								<h5>概述</h5>
								<p>{{projectDetail.summary}}</p>
								<span
									v-if="projectDetail.company_name"
									class="company-name"
								>公司全称：{{projectDetail.company_name}}</span>
							</div>
							<template v-if="projectDetail.more">
								<template v-if="moreDetailInfos">
									<div class="introduce-item" v-if="moreDetailInfos.product_service">
										<h5>产品服务</h5>
										<p>{{moreDetailInfos.product_service}}</p>
									</div>
									<div class="introduce-item" v-if="moreDetailInfos.market_users">
										<h5>市场用户</h5>
										<p>{{moreDetailInfos.market_users}}</p>
									</div>
									<div class="introduce-item" v-if="moreDetailInfos.business_model">
										<h5>商业模式</h5>
										<p>{{moreDetailInfos.business_model}}</p>
									</div>
									<div class="introduce-item" v-if="moreDetailInfos.operational_data">
										<h5>运营数据</h5>
										<p>{{moreDetailInfos.operational_data}}</p>
									</div>
									<div class="introduce-item" v-if="moreDetailInfos.core_resources">
										<h5>核心资源</h5>
										<p>{{moreDetailInfos.core_resources}}</p>
									</div>
								</template>
								<div class="more-info-mask" v-else>
									<router-link to="/investor/auth">
										<el-button type="primary">认证投资人</el-button>
									</router-link>
									<p>查看项目完整介绍</p>
								</div>
							</template>
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
						<template
							v-if="projectDetail.team_advantage || (projectDetail.team && projectDetail.team.length > 0)"
						>
							<div class="section-team-table">
								<div class="team-advantage" v-if="projectDetail.team_advantage">
									<h5>团队优势</h5>
									<p>{{projectDetail.team_advantage}}</p>
								</div>
								<div v-if="projectDetail.team && projectDetail.team.length > 0">
									<h5>成员信息</h5>
									<el-table :data="projectDetail.team">
										<el-table-column label="姓名" prop="real_name" width="160"></el-table-column>
										<el-table-column label="职位" prop="person_position" width="200"></el-table-column>
										<el-table-column label="介绍" prop="introduce"></el-table-column>
									</el-table>
								</div>
							</div>
						</template>
						<p v-else>暂无创始团队信息</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectData">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-bar-chart"></i>项目数据
					</div>
					<div class="section-content">
						<div
							v-if="projectDetail.android_download_address || projectDetail.ios_download_address || projectDetail.official_website || projectDetail.wechat_subscription"
						>
							<el-row>
								<el-col :span="6">
									<p>{{projectDetail.name}}</p>
									<p class="project-data-list">
										<a
											:href="projectDetail.official_website"
											v-if="projectDetail.official_website"
											:title="projectDetail.official_website"
											target="_blank"
										>
											<span class="data-website">官网</span>
										</a>
										<a
											:href="projectDetail.ios_download_address"
											v-if="projectDetail.ios_download_address"
											:title="projectDetail.ios_download_address"
											target="_blank"
										>
											<span class="data-ios">
												<i class="el-icon-fa-apple"></i>
											</span>
										</a>
										<a
											:href="projectDetail.android_download_address"
											v-if="projectDetail.android_download_address"
											:title="projectDetail.android_download_address"
											target="_blank"
										>
											<span class="data-android">
												<i class="el-icon-fa-android"></i>
											</span>
										</a>
										<a
											:href="projectDetail.wechat_subscription"
											v-if="projectDetail.wechat_subscription"
											:title="projectDetail.wechat_subscription"
											target="_blank"
										>
											<span class="data-wechat">
												<i class="el-icon-fa-wechat"></i>
											</span>
										</a>
									</p>
								</el-col>
								<el-col
									:span="18"
									style="border-left: 1px solid #e5e5e5; height: 48px; padding-left: 20px;"
								>
									<p>{{projectDetail.synopsis}}</p>
								</el-col>
							</el-row>
						</div>
						<p v-else>暂无项目数据</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="projectNews">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-newspaper-o"></i>相关新闻
					</div>
					<div class="section-content">
						<div
							v-if="projectDetail.media_coverage && projectDetail.media_coverage.length > 0 && projectDetail.media_coverage[0]"
						>
							<el-row
								v-for="(item, index) in projectDetail.media_coverage"
								:key="index"
								class="media-news-item"
							>
								<el-col :span="4" class="news-time">{{item.time || '未知时间'}}</el-col>
								<el-col :span="20" class="news-title">
									<div class="circle">
										<span class="circle-inside"></span>
									</div>
									<a :href="item.media_coverage">{{item.title}}</a>
								</el-col>
							</el-row>
						</div>
						<p v-else>暂无相关新闻</p>
					</div>
				</el-card>
				<el-card class="no-border prject-detail-section" id="similarProjects">
					<div class="section-title" slot="header">
						<i class="el-icon-fa-briefcase"></i>类似项目
					</div>
					<div class="section-content">
						<div v-if="similarProjects && similarProjects.length > 0">
							<template v-if="similarProjectsMeta && similarProjectsMeta.tags.length > 0">
								<div class="tags-list">
									<el-radio-group v-model="tagId" size="small" @change="handleTagChange">
										<el-radio-button
											v-for="item in tagsList"
											:label="item.tag_id"
											:key="item.tag_id"
										>{{item.tag_name}}</el-radio-button>
									</el-radio-group>
								</div>
							</template>
							<el-table
								:data="similarProjects"
								style="wdith: 100%;"
								row-class-name="similar-projects-item"
								v-loading="tableLoading"
								@row-click="handleTableRowClick"
							>
								<el-table-column label="项目" width="300">
									<template slot-scope="scope">
										<el-row>
											<el-col :span="6">
												<div class="item-logo">
													<img :src="scope.row.logo" alt>
												</div>
											</el-col>
											<el-col :span="18" class="item-text">
												<p class="text-name">{{scope.row.name}}</p>
												<p class="text-summary">{{scope.row.synopsis}}</p>
												<!-- <p v-if="scope.row.tags.length > 0">
													<span :key="item.tag_id" class="text-tag" v-for="item in scope.row.tags">
														<i class="el-icon-fa-tags"></i>
														{{item.name}}
													</span>
												</p>-->
											</el-col>
										</el-row>
									</template>
								</el-table-column>
								<el-table-column label="行业">
									<template slot-scope="scope">{{scope.row.industry_name || '—'}}</template>
								</el-table-column>
								<el-table-column label="轮次">
									<template slot-scope="scope">{{scope.row.round_name || '未披露'}}</template>
								</el-table-column>
								<el-table-column label="所在地">
									<template slot-scope="scope">{{scope.row.region_name || '—'}}</template>
								</el-table-column>
								<el-table-column label="成立时间">
									<template
										slot-scope="scope"
									>{{scope.row.create_time ? scope.row.create_time.substring(0, 7) : scope.row.time}}</template>
								</el-table-column>
							</el-table>
							<div style="text-align: center; margin-top: 10px; height: 32px;">
								<div v-if="!tableLoading">
									<template v-if="!loadAll">
										<el-button size="small" v-if="!buttonLoading" @click="moreSimilarProjects">加载更多</el-button>
										<el-button size="small" v-if="buttonLoading">
											<i class="el-icon-loading"></i>加载中
										</el-button>
									</template>
									<p v-else>没有更多数据了</p>
								</div>
							</div>
						</div>
						<p v-else>暂无类似</p>
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
			<div class="absolute-footer" :style="{ width: navbarWidth ? `${navbarWidth}px` : '100%' }">
				<el-card class="no-border">
					<el-button
						size="small"
						type="warning"
						class="btn-connect"
						@click="visibleConnect = true"
					>获取联系方式</el-button>
					<el-button
						v-if="isCollect"
						size="small"
						type="success"
						class="btn-collect"
						@click="handleCancelCollect"
					>取消收藏</el-button>
					<el-button v-else size="small" type="primary" class="btn-collect" @click="handleCollect">收藏</el-button>
					<el-button @click="downloadBp" type="primary" size="small">查看商业计划书</el-button>
					<a :href="bpPath" target="_blank" style="display: none;">
						<button id="BpDownload"></button>
					</a>
				</el-card>
			</div>
		</template>
		<el-dialog title="是否申请下载BP" :visible.sync="visibleDownloadBp" width="450px">
			<span>您暂时没有权限查看商业计划书，是否选择向项目所有者申请查看商业计划书?</span>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="visibleDownloadBp = false">取 消</el-button>
				<el-button size="small" type="primary" @click="handleApply">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog
			title="项目所有者联系方式"
			:visible.sync="visibleConnect"
			width="400px"
			v-if="projectDetail"
			class="project-connect"
		>
			<el-row>
				<el-col :span="10" class="label">
					<i class="el-icon-fa-phone"></i>电话
				</el-col>
				<el-col :span="14" class="text">{{projectDetail.your_mobile}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="10" class="label">
					<i class="el-icon-fa-envelope"></i>邮箱
				</el-col>
				<el-col :span="14" class="text">{{projectDetail.email}}</el-col>
			</el-row>
			<el-row>
				<el-col :span="10" class="label">
					<i class="el-icon-fa-wechat"></i>微信
				</el-col>
				<el-col :span="14" class="text">{{projectDetail.wechat}}</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import scroll from '@/utils/scroll'
import { getData, postData } from '@/http'

export default {
	data() {
		return {
			init: false,
			currentName: 'projectIntroduce',
			navbarWidth: undefined,
			showFixedBar: false,
			anchorArr: [],
			anchorNameArr: [],
			scrollLock: false,
			page: 1,
			page_size: 5,
			tagId: 0,
			tableLoading: false,
			buttonLoading: false,
			visibleConnect: false,
			visibleDownloadBp: false,
			bpPath: '',
			ableToDownload: 1 // 1 未申请  2 申请中  3 已回复 同意  4 已回复 拒绝
		}
	},
	props: {
		projectId: String
	},
	computed: {
		...mapState({
			projectDetail: state => state.project.projectDetail,
			moreDetailInfos: state => state.project.moreDetailInfos,
			similarProjects: state => state.project.similarProjects,
			similarProjectsMeta: state => state.project.similarProjectsMeta,
			isCollect: state => state.project.isCollect,
			loginStatus: state => state.app.loginStatus,
			currentUserData: state => state.app.currentUserData
		}),
		similarParams() {
			return {
				id: this.projectId,
				page: this.page,
				page_size: this.page_size,
				tag_id: this.tagId
			}
		},
		tagsList() {
			return [
				{ tag_id: 0, tag_name: '综合' },
				...this.similarProjectsMeta.tags
			]
		},
		loadAll() {
			return this.page == this.similarProjectsMeta.pages
		}
	},
	methods: {
		...mapActions(['getProjectDetail', 'getSimilarProjects']),

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
			const container = document.querySelector('.el-main')

			if (container.scrollTop > 116 && !this.showFixedBar) {
				this.showFixedBar = true
			} else if (container.scrollTop <= 116 && this.showFixedBar) {
				this.showFixedBar = false
			}

			if (!this.scrollLock) {
				if (container.scrollTop < this.anchorArr[1]) {
					this.currentName = this.anchorNameArr[0]
				} else {
					for (let i = 1; i < this.anchorArr.length; i++) {
						if (i == this.anchorArr.length - 1 && container.scrollTop >= this.anchorArr[i]) {
							this.currentName = this.anchorNameArr[i]
						} else {
							if (
								container.scrollTop >= this.anchorArr[i] &&
								container.scrollTop < this.anchorArr[i + 1]
							) {
								this.currentName = this.anchorNameArr[i]
								break
							}
						}
					}
				}

				// if (container.scrollTop < this.anchorArr[1]) {
				// 	this.currentName = this.anchorNameArr[0]
				// } else if (
				// 	container.scrollTop >= this.anchorArr[1] &&
				// 	container.scrollTop < this.anchorArr[2]
				// ) {
				// 	this.currentName = this.anchorNameArr[1]
				// } else if (
				// 	container.scrollTop >= this.anchorArr[2] &&
				// 	container.scrollTop < this.anchorArr[3]
				// ) {
				// 	this.currentName = this.anchorNameArr[2]
				// } else if (
				// 	container.scrollTop >= this.anchorArr[3] &&
				// 	container.scrollTop < this.anchorArr[4]
				// ) {
				// 	this.currentName = this.anchorNameArr[3]
				// } else if (
				// 	container.scrollTop >= this.anchorArr[4] &&
				// 	container.scrollTop < this.anchorArr[5]
				// ) {
				// 	this.currentName = this.anchorNameArr[4]
				// } else {
				// 	this.currentName = this.anchorNameArr[5]
				// }
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
		},
		handleCollect() {
			if (!this.loginStatus) {
				this.$message.error('请登录后再进行该操作')
				return
			}
			postData('/index/user/addCollection', {
				project_id: this.projectId
			}).then(
				() => {
					this.$message.success('收藏成功')
					this.$store.commit('CHANGE_COLLECT_STATUS', 1)
				},
				err => {
					console.log(err)
				}
			)
		},
		handleCancelCollect() {
			if (!this.loginStatus) {
				this.$message.error('请登录后再进行该操作')
				return
			}
			postData('/index/user/deleteCollection', {
				project_id: this.projectId
			}).then(
				() => {
					this.$message.success('取消收藏成功')
					this.$store.commit('CHANGE_COLLECT_STATUS', 0)
				},
				err => {
					console.log(err)
				}
			)
		},
		handleTagChange() {
			this.page = 1
			this.tableLoading = true
			setTimeout(() => {
				this.getSimilarProjects({
					...this.similarParams
				}).finally(() => {
					this.tableLoading = false
				})
			}, 1000)
		},
		handleTableRowClick(row) {
			this.$router.push({
				path: `/project/detail/${row.project_id}`
			})
		},
		moreSimilarProjects() {
			this.buttonLoading = true
			setTimeout(() => {
				this.page++
				this.getSimilarProjects({
					...this.similarParams
				}).finally(() => {
					this.buttonLoading = false
				})
			}, 1000)
		},
		downloadBp() {
			if (!this.loginStatus) {
				this.$message.error('请登录后再进行该操作')
				return
			}
			if (this.currentUserData.authentication !== 1) {
				this.$message.error('认证投资人后才能查看项目BP')
				setTimeout(() => {
					this.$router.push({
						path: '/investor/auth'
					})
				}, 1000)
			} else {
				if (this.ableToDownload == 1) {
					this.visibleDownloadBp = true
				} else if (this.ableToDownload == 2) {
					this.$message.success(
						'您已发送过申请，请耐心等待项目所有人的回复'
					)
				} else if (this.ableToDownload == 3) {
					if (this.bpPath) {
						document.querySelector('#BpDownload').click()
					}
				} else {
					this.$message.error('您没有权限查看该BP')
				}
			}
		},
		applyToDownload() {
			getData('/index/download', {
				project_id: this.projectId
			}).then(
				res => {
					this.ableToDownload = res.data.code
					if (res.data.code == 3) {
						this.bpPath = res.data.path
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		handleApply() {
			this.visibleDownloadBp = false
			postData('/index/consult', {
				project_id: this.projectId
			}).then(
				() => {
					this.$message.success(
						'已成功发送申请，正在等待项目所有者回复'
					)
					this.ableToDownload = 2
				},
				err => {
					console.log(err)
				}
			)
		}
	},
	created() {
		this.init = true
		this.getProjectDetail(this.projectId).finally(() => {
			this.init = false
			this.getSimilarProjects(this.similarParams)
		})
		if (this.loginStatus) {
			this.applyToDownload()
		}
	},
	mounted() {
		this.$nextTick(() => {
			document
				.querySelector('.el-main')
				.addEventListener('scroll', this.onScroll, false)
		})

		setTimeout(() => {
			this.initAnchorArr()
			this.navbarWidth = document.querySelector(
				'.project-detail'
			).offsetWidth
		}, 1000)
	},
	destroyed() {
		document
			.querySelector('.el-main')
			.removeEventListener('scroll', this.onScroll, false)
		this.$store.commit('CLEAR_PROJECT_DETAIL')
	},
	beforeRouteUpdate(to) {
		const projectId = to.path.substring(16)
		const url = window.location.href
		const lastIndex = url.lastIndexOf('/')
		window.location.replace(
			`${url.substring(0, lastIndex + 1) + projectId}`
		)
	}
}
</script>

