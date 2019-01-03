<template>
    <div class="account-project">
		<el-tabs v-model="activeName">
			<el-tab-pane label="项目列表" name="projectList">
				<el-card class="no-border account-section">
					
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'projectList'
        }
    }
}
</script>
