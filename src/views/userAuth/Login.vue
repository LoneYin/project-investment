<template>
	<div class="auth login">
		<el-card>
			<h5>用户登录</h5>
			<el-form :model="formData" :rules="rules">
				<el-form-item prop="mobile">
					<el-input placeholder="请输入手机号" prefix-icon="el-icon-fa-mobile" v-model="formData.mobile"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						placeholder="请输入密码"
						prefix-icon="el-icon-fa-lock"
						type="password"
						v-model="formData.password"
					></el-input>
				</el-form-item>
				<div class="auth-link-row">
					<router-link :to="{ path: '/register'}" class="el-form-link pull-left">注册新用户</router-link>
					<router-link :to="{ path: '/forget'}" class="el-form-link pull-right">忘记密码</router-link>
					<a class="el-form-link pull-right auth-btn-qq" :href="`${server}/qqLogin`">
						<i class="el-icon-fa-qq"></i>
						QQ登录
					</a>
				</div>
				<el-form-item>
					<el-button
						:loading="submitButtonLoading"
						@click="handleSubmit"
						class="auth-btn-submit"
						type="primary"
					>立即登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import validator from '@/utils/validator'
import { postData, server } from '@/http'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
	data() {
		return {
			submitButtonLoading: false,
			formData: {
				mobile: undefined,
				password: undefined
			},
			rules: {
				mobile: [
					{ required: true, message: '手机号不能为空' },
					{ validator: validator.mobile, trigger: 'blur' }
				],
				password: [
					{ required: true, message: '密码不能为空' },
					{ validator: validator.password, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		...mapMutations({
			setLoginStatus: 'SET_LOGIN_STATUS',
			clearRecentMobile: 'SET_RECENT_MOBILE'
		}),
		...mapActions(['getCurrentUserData']),
		handleSubmit() {
			this.submitButtonLoading = true
			postData('/index/login', {
				mobile: this.formData.mobile,
				password: this.formData.password
			}).then(
					res => {
						this.$message.success('登陆成功')
						this.setLoginStatus(res.data)
						this.getCurrentUserData()
						this.$router.push({ path: '/' })
					},
					err => {
						console.log(err)
				}
			).finally(() => {
				this.submitButtonLoading = false
			})
		}
	},
	computed: {
		...mapState({
			recentMobile: state => state.app.recentMobile
		}),
		server() {
			return server
		}
	},
	mounted() {
		if (this.recentMobile) {
			this.formData.mobile = this.recentMobile 
			this.clearRecentMobile()
		}
	}
}
</script>

<style>
</style>
