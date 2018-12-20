<template>
	<div class="projects">
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
import { mapActions, mapState } from 'vuex'

export default {
	name: 'newExperienceProjects',
	data() {
		return {
			selectorsData: {},
			tableInitLoading: false,
			moreLoading: false
		}
	},
	components: {
		ProjectSelectors,
		ProjectTable
	},
	computed: {
		...mapState({
			projectsList: state => state.discovery.projectsList,
			projectsListPages: state => state.discovery.projectsListPages
		})
	},
	methods: {
		...mapActions(['getNewExperienceProjects']),
		getProjets(data) {
			this.selectorsData = { ...data }
			this.getNewExperienceProjects({
				...data,
				page: 1
			}).finally(() => {
				this.$refs.projectTable.page = 1
			})
		},
		getMoreProjects(page) {
			const params = {
				...this.selectorsData,
				page
			}
			this.moreLoading = true
			this.getNewExperienceProjects(params).finally(() => {
				this.moreLoading = false
			})
		}
	},
	created() {
        this.tableInitLoading = true
        this.getNewExperienceProjects().finally(() => {
            this.tableInitLoading = false
        })
    }
}
</script>


