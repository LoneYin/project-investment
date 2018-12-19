<template>
	<div class="common-header">
		<div class="auth-navigator">
			<el-menu @select="handleSelect" mode="horizontal" router>
				<el-menu-item index="/submit_project">提交项目</el-menu-item>
				<el-menu-item index="/auth_investor">认证投资人</el-menu-item>
				<template v-if="isLogin">
                    <el-menu-item index="/user">
                         {{ currentUserData ? currentUserData.user_name : ''}}
                    </el-menu-item>
                   
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
		return {}
    },
    computed: {
        ...mapState({
            isLogin: state =>  state.app.loginStatus,
            currentUserData:  state => state.app.currentUserData
        })
    },
	methods: {
		handleSelect(index) {
			console.log(index)
		}
	}
}
</script>
