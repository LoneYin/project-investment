<template>
	<el-container class="full-screen-container padding-container">
		<el-row class="row-bg" justify="center" type="flex">
			<el-col :span="6">
				<el-container v-loading.fullscreen.lock="fullscreenLoading">
					<center>
						<h1>正在为您安全登出</h1>
					</center>
				</el-container>
			</el-col>
		</el-row>
	</el-container>
</template>

<script>
export default {
	name: 'logout',
	data() {
		return {
			fullscreenLoading: false
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$confirm('您将会退出登录?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					vm.fullscreenLoading = true
					vm.$message({
						message: '退出登录成功',
						type: 'success'
					})
                    vm.$store.commit('SET_LOGOUT')
					vm.$router.push({ name: 'index' })
				})
				.catch(() => {
					vm.$router.push(from.fullPath)
				})
		})
	}
}
</script>

<style>
</style>
