<template>
	<div class="projects">
		<ProjectSelectors @refreshList="getProjectsList" />
		<ProjectTable :projectsList="projectsList" :isLoading="tableLoading" />
	</div>
</template>

<script>

import ProjectSelectors from '@/components/project/ProjectSelectors.vue'
import ProjectTable from '@/components/project/ProjectTable.vue'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'projects',
	data() {
		return {
			selectorsData: undefined,
			tableLoading: false
		}
	},
	components: {
		ProjectSelectors,
		ProjectTable
	},
	computed: {
		...mapState({
			projectsList: state => state.project.projectsList
		})
	},
	methods: {
		...mapActions(['getProjectsList']),
		getProjets(data) {
			this.selectorsData = {...data}
			this.getProjectsList(data)
		}
	},
	created() {
		if (!this.projectsList) {
			this.tableLoading = true
			this.getProjectsList().finally(() => {
				this.tableLoading = false
			})
		}
	}
}
</script>
