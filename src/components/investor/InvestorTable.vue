<template>
	<el-card class="no-border project-table" v-loading="initLoading">
		<el-table :data="defaultData" row-class-name="project-table-item">
			<el-table-column label="投资人" width="400" prop="real_name">1</el-table-column>
			<el-table-column label="关注领域" prop="investor_id"></el-table-column>
			<el-table-column label="偏好轮次" prop="region_id"></el-table-column>
			<el-table-column label="投资总数" prop="status"></el-table-column>
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
					this.$emit('loadMore', this.page)
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
