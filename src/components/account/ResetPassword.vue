<template>
	<el-form :model="formData" :rules="rules" ref="resetPasswordForm">
		<el-form-item prop="validateMobile">
			<el-input placeholder="请输入安全手机号" v-model="formData.validateMobile"></el-input>
		</el-form-item>
		<el-form-item prop="newPassword">
			<el-input placeholder="请输入新密码" type="password" v-model="formData.newPassword"></el-input>
		</el-form-item>
		<el-form-item prop="validateCode">
			<el-col :span="12">
				<el-input placeholder="请输入短信验证码" v-model="formData.validateCode"></el-input>
			</el-col>
			<el-col :span="11" :offset="1">
				<el-button v-if="isForbidden" type="primary" disabled>60秒后可重新发送</el-button>
				<el-button v-else type="primary" @click="sendMessage">发送短信验证码</el-button>
			</el-col>
		</el-form-item>
		<el-form-item>
			<el-button
				:loading="submitButtonLoading"
				@click="resetPassword"
				style="width: 100%"
				type="primary"
			>重置密码</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { postData } from '@/http'
import validator from '@/utils/validator'
export default {
	data() {
		return {
			formData: {
				validateMobile: '',
				newPassword: '',
				validateCode: ''
			},
			rules: {
				validateMobile: [{
					required: true,
					message: '手机号码不能为空'
				}],
				newPassword: [
					{
						required: true,
						message: '新密码不能为空'
					},
					{ validator: validator.password, trigger: 'blur' }
				],
				validateCode: [{
					required: true,
					message: '短信验证码不能为空'
				}]
			},
			isForbidden: false,
			submitButtonLoading: false,
			count: 90
		}
	},
	props: {
		mobile: String
	},
	methods: {
		sendMessage() {
			if (!/^1(3|4|5|7|8)\d{9}$/.test(this.formData.validateMobile)) {
				this.$message.error('请输入正确的手机号')
				return
			}
			if (this.mobile !== this.formData.validateMobile) {
				this.$message.error('请输入绑定的安全手机号')
				return
			}
			if (!this.isForbidden) {
				postData('/index/getSms', {
					mobile: this.formData.validateMobile
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
		resetPassword() {
			this.$refs['resetPasswordForm'].validate(valid => {
				if (valid) {
					this.submitButtonLoading = true
					postData('/index/findPassWord', {
						mobile: this.formData.validateMobile,
						new_password: this.formData.newPassword,
						code: this.formData.validateCode
					})
						.then(
							() => {
								this.$message.success('修改成功')
								this.$emit('close')
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

<style>
</style>
