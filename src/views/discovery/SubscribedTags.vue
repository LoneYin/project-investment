<template>
	<div class="projects">
		<UserTags @refreshList="getProjets"/>
		<ProjectSelectors @refreshList="getProjets"/>
		<ProjectTable
			:defaultData="projectsList"
			:initLoading="tableInitLoading"
			:moreLoading="moreLoading"
			:pagination="projectsListPages"
			@loadMore="getMoreProjects"
			ref="projectTable"
		/>
	</div>
</template>

<script>
import ProjectSelectors from '@/components/project/ProjectSelectors.vue'
import ProjectTable from '@/components/project/ProjectTable.vue'
import UserTags from '@/components/project/UserTags.vue'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'subscribedTags',
	data() {
		return {
			selectorsData: {},
			tableInitLoading: false,
			moreLoading: false
		}
	},
	components: {
		ProjectSelectors,
		ProjectTable,
		UserTags
	},
	computed: {
		...mapState({
			projectsList: state => state.discovery.projectsList,
			projectsListPages: state => state.discovery.projectsListPages
		})
	},
	methods: {
		...mapActions(['getTagsProjects']),
		getProjets(data) {
			if (!data) {
				data = {
					round_id: [],
					industry_id: [],
					region_id: []
				}
			}
			this.selectorsData = { ...data }
			this.getTagsProjects({
				...data,
				page: 1
			}).finally(() => {
				this.$refs.projectTable.page = 1
			})
		},
		getMoreProjects(page, scrollTop) {
			const params = {
				...this.selectorsData,
				page
			}
			this.moreLoading = true
			setTimeout(() => {
				this.getTagsProjects(params).finally(() => {
					this.moreLoading = false
					document.querySelector('.el-main').scrollTo(0, scrollTop)
				})
			}, 1000)
		}
	},
	created() {
		this.tableInitLoading = true
		this.getTagsProjects().finally(() => {
			this.tableInitLoading = false
		})
	}
}
</script>

