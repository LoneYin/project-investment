<template>
	<div class="index">
		<el-row class="index-row">
			<el-col :span="18" class="index-col-left">
				<div class="index-carousel" v-if="advertisementList">
					<el-carousel
						:arrow="advertisementList.sowing_map.length > 1 ? '' : 'never'"
						:indicator-position="advertisementList.sowing_map.length > 1 ? '' : 'never'"
						:interval="5000"
						height="265px"
						trigger="click"
					>
						<el-carousel-item :key="item.news_id" v-for="item in advertisementList.sowing_map">
							<img :src="item.img" alt>
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="index-projects">
					<el-card class="no-border">
						<el-tabs @tab-click="handleProjectsClick" v-model="activeProjectType">
							<el-tab-pane label="每日精选项目" name="daily_project">
								<el-row v-if="dailyProjectsList">
									<el-col
										:key="item.project_id"
										:span="8"
										class="index-project-item"
										v-for="(item, index) in dailyProjectsList"
										v-show="index < 6"
									>
										<el-card shadow="hover">
											<el-row>
												<el-col :span="8">
													<div class="index-project-item-logo">
														<img :src="item.logo" alt>
													</div>
												</el-col>
												<el-col :span="16" class="index-project-item-text">
													<p style="line-height: 20px;">
														<span class="text-name">
															{{item.name}}
														</span>
														<span class="text-industry_name">
															{{item.industry_name}}
														</span>
													</p>
													<p class="text-round_name">{{item.round_name}}</p>
													<p class="text-summary">{{item.summary}}</p>
												</el-col>
											</el-row>
										</el-card>
									</el-col>
								</el-row>
							</el-tab-pane>
							<el-tab-pane label="抢手项目" name="hot_project">
								<el-row v-if="hotProjectsList">
									<el-col
										:key="item.project_id"
										:span="8"
										class="index-project-item"
										v-for="(item, index) in hotProjectsList"
										v-show="index < 6"
									>
										<el-card shadow="hover">
											<el-row>
												<el-col :span="8">
													<div class="index-project-item-logo">
														<img :src="item.logo" alt>
													</div>
												</el-col>
												<el-col :span="16" class="index-project-item-text">
													<p style="line-height: 20px;">
														<span class="text-name">
															{{item.name}}
														</span>
														<span class="text-industry_name">
															{{item.industry_name}}
														</span>
													</p>
													<p class="text-round_name">{{item.round_name}}</p>
													<p class="text-summary">{{item.summary}}</p>
												</el-col>
											</el-row>
										</el-card>
									</el-col>
								</el-row>
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</div>
			</el-col>
			<el-col :span="6" class="index-col-right">
				<div class="index-top_right-carousel" v-if="advertisementList">
					<el-carousel
						:arrow="advertisementList.upper_right_ad.length > 1 ? '' : 'never'"
						:indicator-position="advertisementList.upper_right_ad.length > 1 ? '' : 'never'"
						:interval="5000"
						height="265px"
						trigger="click"
					>
						<el-carousel-item :key="item.news_id" v-for="item in advertisementList.upper_right_ad">
							<img :src="item.img" alt>
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	data() {
		return {
			activeProjectType: 'daily_project'
		}
	},
	computed: {
		...mapState({
			advertisementList: state => state.index.advertisementList,
			dailyProjectsList: state => state.index.dailyProjectsList,
			hotProjectsList: state => state.index.hotProjectsList
		})
	},
	methods: {
		...mapActions([
			'getAdvertisementList',
			'getDailyProjectsList',
			'getHotProjectsList'
		]),
		handleProjectsClick() {}
	},
	created() {
		this.getAdvertisementList()
		this.getDailyProjectsList()
		this.getHotProjectsList()
	}
}
</script>

<style lang="less">

</style>
