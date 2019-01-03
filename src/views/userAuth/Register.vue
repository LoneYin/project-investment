<template>
	<div class="auth register">
		<el-card>
			<h5>用户注册</h5>
			<el-form :model="formData" :rules="rules" ref="registerForm">
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
				<el-form-item prop="r_password">
					<el-input
						placeholder="请再次输入密码"
						prefix-icon="el-icon-fa-lock"
						type="password"
						v-model="formData.r_password"
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
					>立即注册</el-button>
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
	data() {
		const repeatValidator = (rule, value, callback) => {
			if (value !== this.formData.password) {
				callback(new Error('两次密码输入不一致'))
			} else {
				callback()
			}
		}

		return {
			isForbidden: false,
			count: 90,
			submitButtonLoading: false,
			formData: {
				mobile: '',
				password: '',
				r_password: '',
				verificationCode: ''
			},
			rules: {
				mobile: [
					{ required: true, message: '手机号不能为空' },
					{ validator: validator.mobile, trigger: 'blur' }
				],
				password: [
					{ required: true, message: '密码不能为空' },
					{ validator: validator.password, trigger: 'blur' }
				],
				r_password: [
					{ required: true, message: '重复密码不能为空' },
					{ validator: repeatValidator, trigger: 'blur' }
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
			this.$refs['registerForm'].validate(valid => {
				if (valid) {
					this.submitButtonLoading = true
					postData('/index/register', {
						mobile: this.formData.mobile,
						password: this.formData.password,
						r_password: this.formData.r_password,
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
			})
		}
	}
}
</script>
