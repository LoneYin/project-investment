<template>
	<div class="projects">
		<ProjectSelectors @refreshList="getProjets" />
	</div>
</template>

<script>

import ProjectSelectors from '@/components/project/ProjectSelectors.vue'
import { mapActions, mapState } from 'vuex'

export default {
	name: 'projects',
	data() {
		return {
			
		}
	},
	components: {
		ProjectSelectors
	},
	computed: {
		...mapState({
			projectsList: state => state.project.projectsList
		})
	},
	methods: {
		...mapActions(['getProjectsList']),
		getProjets(data) {
			this.getProjectsList(data)
		}
	},
	watch: {
		projectsList() {

		}
	}
}
</script>
