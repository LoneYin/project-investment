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
                            <el-tab-pane label="每日精选项目" name="daily_project">每日精选项目</el-tab-pane>
                            <el-tab-pane label="抢手项目" name="hot_project">抢手项目</el-tab-pane>
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
			advertisementList: state => state.index.advertisementList
		})
	},
	methods: {
        ...mapActions(['getAdvertisementList']),
        handleProjectsClick() {

        }
	},
	created() {
		this.getAdvertisementList()
	}
}
</script>

<style lang="less">
.index {
	width: 1140px;
	margin: 0 auto;
	height: 600px;
	.index-carousel {
		height: 265px;
	}
}
.index-col-left {
    &>div {
        margin-bottom: 20px;
    }
}
.index-row {
	.el-col {
		padding: 0 10px;
		// background: #fff;
	}
}
.el-carousel__item {
	img {
		width: 100%;
		height: 100%;
	}
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
</style>
