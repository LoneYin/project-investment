<template>
	<div class="auth register">
		<el-card>
			<h5>找回密码</h5>
			<el-form :model="formData" :rules="rules">
				<el-form-item prop="mobile">
					<el-input placeholder="请输入注册手机号" prefix-icon="el-icon-fa-mobile" v-model="formData.mobile"></el-input>
				</el-form-item>
				<el-form-item prop="new_password">
					<el-input
						placeholder="请输入新密码"
						prefix-icon="el-icon-fa-lock"
                        type="password"
						v-model="formData.new_password"
					></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item prop="verificationCode">
							<el-input
								placeholder="请输入短信验证码"
								prefix-icon="el-icon-fa-phone"
								v-model="formData.verificationCode"
							></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-button :disabled="isForbidden" @click="sendMessage" type="primary">
							<span>{{isForbidden ? `${count}秒后可重新发送` : '发送验证码'}}</span>
						</el-button>
					</el-col>
				</el-row>

				<el-form-item>
					<el-button
						:loading="submitButtonLoading"
						@click="handleSubmit"
						class="auth-btn-submit"
						type="primary"
					>重置密码</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import validator from '@/utils/validator'
import { postData } from '@/http'
import { mapMutations } from 'vuex'
export default {
    name: 'forget',
	data() {
		return {
			isForbidden: false,
			count: 90,
			submitButtonLoading: false,
			formData: {
				mobile: '',
				new_password: '',
				verificationCode: ''
			},
			rules: {
				mobile: [
					{ required: true, message: '手机号不能为空' },
					{ validator: validator.mobile, trigger: 'blur' }
				],
				new_password: [
					{ required: true, message: '新密码不能为空' },
					{ validator: validator.password, trigger: 'blur' }
				],
				verificationCode: [
					{ required: true, message: '验证码不能为空' }
				]
			}
		}
	},
	methods: {
        ...mapMutations({
			setRecentMobile: 'SET_RECENT_MOBILE'
		}),
		sendMessage() {
			if (!/^1(3|4|5|7|8)\d{9}$/.test(this.formData.mobile)) {
				this.$message.error('请输入正确的手机号')
				return
			}
			if (!this.isForbidden) {
				postData('/index/getSms', {
					mobile: this.formData.mobile
				}).then(
					res => {
						this.$message.success(res.message)
						this.isForbidden = true
						const countDown = setInterval(() => {
							if (this.count == 0) {
								clearInterval(countDown)
								this.isForbidden = false
								this.count = 90
							} else {
								this.count--
							}
						}, 1000)
					},
					err => {
						console.log(err)
					}
				)
			}
		},
		handleSubmit() {
			this.submitButtonLoading = true
			postData('/index/findPassWord', {
				mobile: this.formData.mobile,
				new_password: this.formData.new_password,
				code: this.formData.verificationCode
			})
				.then(
					res => {
						this.$message.success(res.message)
						this.setRecentMobile(this.formData.mobile)
						this.$router.push({ path: '/login' })
					},
					err => {
						console.log(err)
					}
				)
				.finally(() => {
					this.submitButtonLoading = false
				})
		}
	}
}
</script>

<style>
</style>

