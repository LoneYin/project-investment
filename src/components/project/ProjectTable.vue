<template>
	<el-card class="no-border project-table" v-loading="initLoading">
		<el-table :data="defaultData" @row-click="handleClick" row-class-name="project-table-item">
			<el-table-column label="投资项目" width="600">
				<template slot-scope="scope">
					<el-row>
						<el-col :span="4">
							<div class="item-logo">
								<img :src="scope.row.logo" alt>
							</div>
						</el-col>
						<el-col :span="20" class="item-text">
							<p class="text-name">{{scope.row.name}}</p>
							<p class="text-summary">{{scope.row.summary}}</p>
							<p v-if="scope.row.tags.length > 0">
								<span :key="item.tag_id" class="text-tag" v-for="item in scope.row.tags">
									<i class="el-icon-fa-tags"></i>
									{{item.name}}
								</span>
							</p>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column label="行业" prop="industry_name"></el-table-column>
			<el-table-column label="轮次" prop="round_name"></el-table-column>
			<el-table-column label="所在地" prop="region_name"></el-table-column>
			<el-table-column label="成立时间">
				<template
					slot-scope="scope"
				>{{scope.row.create_time ? scope.row.create_time.substring(0, 7) : scope.row.time}}</template>
			</el-table-column>
		</el-table>
		<el-row class="project-table-footer" v-if="moreLoading">
			<el-col>
				<i class="el-icon-loading" style="margin-right: 10px;"></i>
				<span>数据加载中</span>
			</el-col>
		</el-row>
		<el-row class="project-table-footer" v-if="loadAll">
			<el-col>
				<span>没有更多数据了</span>
			</el-col>
		</el-row>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			loadLock: false
		}
	},
	props: {
		defaultData: Array,
		initLoading: Boolean,
		moreLoading: Boolean,
		pagination: Object
	},
	computed: {
		loadAll() {
			return this.pagination.currentPage == this.pagination.total
		}
	},
	methods: {
		onScroll() {
			const container = document.querySelector('.el-main')
			const clientHeight =
				document.body.clientHeight ||
				document.documentElement.clientHeight
			if (
				container.scrollTop + clientHeight ==
				container.firstElementChild.offsetHeight + 80
			) {
				if (!this.loadAll && !this.loadLock) {
					this.loadLock = true
					if (this.page < this.pagination.total) this.page++
					this.$emit('loadMore', this.page, container.scrollTop + 40)
				}
			} else {
				if (!this.loadAll && !this.moreLoading) {
					this.loadLock = false
				}
			}
		},
		handleClick(row) {
			this.$router.push({
				path: `/project/detail/${row.project_id}`
			})
		}
	},
	created() {
		// console.log(this.projectsList)
	},
	mounted() {
		document
			.querySelector('.el-main')
			.addEventListener('scroll', this.onScroll, false)
	},
	destroyed() {
		document
			.querySelector('.el-main')
			.removeEventListener('scroll', this.onScroll, false)
		this.$store.commit('CLEAR_PROJECTS_LIST')
	}
}
</script>
