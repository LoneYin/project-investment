<template>
	<el-form :model="formData" :rules="rules" :ref="`validateMobileForm${step}`">
		<el-form-item prop="mobile">
			<el-input :placeholder="step == 1 ? '请输入当前绑定的手机号' : '请输入您要修改的手机号'" v-model="formData.mobile"></el-input>
		</el-form-item>

		<el-form-item prop="validateCode">
			<el-row>
				<el-col :span="11">
					<el-input placeholder="请输入短信验证码" v-model="formData.validateCode"></el-input>
				</el-col>
				<el-col :span="12" :offset="1">
					<el-button v-if="isForbidden" type="primary" disabled>{{count}}秒后可重新发送</el-button>
					<el-button v-else type="primary" @click="sendMessage">发送短信验证码</el-button>
				</el-col>
			</el-row>
		</el-form-item>

		<el-form-item>
			<el-button
				:loading="submitButtonLoading"
				style="width: 100%;"
				type="primary"
				:disabled="formData.validateCode.length !== 6"
				@click="validateMobile"
			>确定</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { postData } from '@/http'
import { mapActions } from 'vuex'
import validator from '@/utils/validator'
export default {
	data() {
		return {
			formData: {
				mobile: '',
				validateCode: ''
			},
			rules: {
				mobile: [
					{
						required: true,
						message: '手机号不能为空'
					}, {
						validator: validator.mobile,
						trigger: 'blur'
					}
				],
				validateCode: [{
					required: true,
					message: '短信验证码'
				}]
			},
			isForbidden: false,
			submitButtonLoading: false,
			count: 90
		}
	},
	props: {
		mobile: String,
		step: Number
	},
	methods: {
		...mapActions(['getCurrentUserData']),
		sendMessage() {
			if (!/^1(3|4|5|7|8)\d{9}$/.test(this.formData.mobile)) {
				this.$message.error('请输入正确的手机号')
				return
			}
			if (this.step == 1 && this.mobile !== this.formData.mobile) {
				this.$message.error('请输入当前绑定的安全手机号')
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
		validateMobile() {
			this.$refs[`validateMobileForm${this.step}`].validate(valid => {
				if (valid) {
					this.submitButtonLoading = true
					if (this.step == 1) {
						postData('/index/user/firstVerify', {
							mobile: this.formData.mobile,
							code: this.formData.validateCode
						}).then(
							res => {
								console.log(res)
								this.$emit('next')
							},
							err => {
								console.log(err)
							})
							.finally(() => {
								this.submitButtonLoading = false
							})
					} else {
						postData('/index/user/changeMobile', {
							mobile: this.formData.mobile,
							code: this.formData.validateCode
						}).then(
							res => {
								console.log(res)
								this.getCurrentUserData()
								this.$message.success('修改手机号成功')
								this.$emit('close')
							},
							err => {
								console.log(err)
							})
							.finally(() => {
								this.submitButtonLoading = false
							})
					}
				}
			})
		}
	}
}
</script>
