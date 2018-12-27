<template>
	<div class="common-header">
		<div class="auth-navigator">
			<el-menu
				:default-active="activeIndex"
				mode="horizontal"
				ref="headerMenu"
				router
			>
				<el-menu-item index="/project/submit">提交项目</el-menu-item>
				<el-menu-item index="/investor/auth">认证投资人</el-menu-item>
				<template v-if="isLogin">
					<el-menu-item index="/user">{{ currentUserData ? currentUserData.user_name : ''}}</el-menu-item>

					<el-menu-item index="/logout">退出登陆</el-menu-item>
				</template>
				<template v-else>
					<el-menu-item index="/register">注册</el-menu-item>
					<el-menu-item index="/login">登录</el-menu-item>
				</template>
			</el-menu>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			pathArr: [
				'/project/submit',
				'/investor/auth',
				'/user',
				'/logout',
				'/register',
				'/login'
			]
		}
	},
	computed: {
		...mapState({
			isLogin: state => state.app.loginStatus,
			currentUserData: state => state.app.currentUserData,
			activeIndex: state => state.app.activeIndex
		})
	},
	// watch: {
	// 	$route(to) {
	// 		if (this.pathArr.includes(to.path)) {
	// 			this.activeMenu = to.path
	// 		} else {
	// 			if (this.activeMenu) {
	// 				// this.$refs['headerMenu'].items[this.activeMenu].active = false
	// 				this.activeMenu = ''
	// 				const menu = document.querySelector('.common-header')
	// 				const active = menu.querySelector('.is-active')
	// 				active && active.classList.remove('is-active')
	// 			}	
	// 		}
	// 	}
	// },
	// created() {
	// 	this.activeMenu = this.$route.path
	// }
}
</script>
