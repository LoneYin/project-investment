<template>
	<el-card class="no-border project-table" v-loading="initLoading">
		<el-table :data="defaultData" row-class-name="project-table-item">
			<el-table-column label="投资人" width="300">
				<template slot-scope="scope">
					<el-row>
						<el-col :span="8">
							<div class="item-logo">
								<img :src="scope.row.portrait" alt="">
							</div>
						</el-col>
						<el-col :span="16">
							<div class="item-text">
								<p class="text-name">{{scope.row.real_name}}</p>
								<p class="text-summary">{{scope.row.position}}</p>
							</div>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column label="关注领域" prop="investor_id">
				<template slot-scope="scope">
					<div v-if="scope.row.industry_name.length > 0">
						<p v-for="(item, index) in scope.row.industry_name.slice(0, 3)" :key="index">{{item}}</p>
					</div>
					<div v-else>—</div>
				</template>
			</el-table-column>
			<el-table-column label="偏好轮次">
				<template slot-scope="scope">
					<div v-if="scope.row.round_name.length > 0">
						<p v-for="(item, index) in scope.row.round_name.slice(0, 3)" :key="index">{{item}}</p>
					</div>
					<div v-else>—</div>
				</template>
			</el-table-column>
			<el-table-column label="投资总数">
				<template slot-scope="scope">
					{{scope.row.total_invest || '—'}}
				</template>
			</el-table-column>
			<el-table-column label="最近投资">
				<template slot-scope="scope">
					{{scope.row.recent_invest || '—'}}
				</template>
			</el-table-column>
			<el-table-column label="所在地" prop="area_name"></el-table-column>
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
				container.scrollTop + clientHeight >
				container.firstElementChild.offsetHeight - 60
			) {
				if (!this.loadAll && !this.loadLock) {
					this.loadLock = true
					if (this.page < this.pagination.total) this.page++
					this.$emit('loadMore', this.page, (container.scrollTop + 40))
				}
			} else {
				if (!this.loadAll && !this.moreLoading) {
					this.loadLock = false
				}
			}
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
	}
}
</script>
