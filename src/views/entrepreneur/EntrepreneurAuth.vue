<template>
	<div class="auth-entrepreneur" v-loading="loading">
		<div class="auth-entrepreneur-header">
			<p class="header-title">认证创业者</p>
			<p class="header-subtitle">获得更多投资人的关注</p>
		</div>
		<div class="auth-entrepreneur-form">
			<div class="form-body">
				<el-form :model="authForm" :rules="rules" label-width="140px" ref="authForm">
					<el-form-item prop="realname" label="真实姓名">
						<el-input size="small" style="width: 400px;" v-model="authForm.realname"></el-input>
					</el-form-item>
					<el-form-item prop="idNumber" label="身份证号">
						<el-input size="small" style="width: 400px;" v-model="authForm.idNumber"></el-input>
					</el-form-item>
					<el-form-item prop="idCardFront" label="身份证正面照片（照片面）">
						<el-upload
							:action="action"
							:before-upload="beforeUpload"
							:data="{type: 'entrepreneur'}"
							:headers="headers"
							:on-success="res => handleUploadSuccess(res, 'idCardFront')"
							:show-file-list="false"
							class="avatar-uploader"
							name="image"
						>
							<img :src="authForm.idCardFront" class="avatar" v-if="authForm.idCardFront">
							<i class="el-icon-plus avatar-uploader-icon" v-else></i>
						</el-upload>
					</el-form-item>
					<el-form-item prop="idCardReverse" label="身份证背面照片（国徽面）">
						<el-upload
							:action="action"
							:before-upload="beforeUpload"
							:data="{type: 'entrepreneur'}"
							:headers="headers"
							:on-success="res => handleUploadSuccess(res, 'idCardReverse')"
							:show-file-list="false"
							class="avatar-uploader"
							name="image"
						>
							<img :src="authForm.idCardReverse" class="avatar" v-if="authForm.idCardReverse">
							<i class="el-icon-plus avatar-uploader-icon" v-else></i>
						</el-upload>
					</el-form-item>
					<el-form-item prop="introduce" label="个人自述">
						<el-input
							:rows="3"
							type="textarea"
							size="small"
							style="width: 400px;"
							v-model="authForm.introduce"
						></el-input>
					</el-form-item>
					<el-form-item prop="group" label="所属公司/机构/团队">
						<el-input size="small" style="width: 400px;" v-model="authForm.group"></el-input>
					</el-form-item>
					<el-form-item prop="position" label="职务/角色">
						<el-input size="small" style="width: 400px;" v-model="authForm.position"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="submit">提交认证信息</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { server, authKey } from '@/http'
import encrypt from '@/utils/encrypt'
import { getCookie } from '@/utils/cookie'
import validator from '@/utils/validator'
import { postData } from '@/http'
export default {
	data() {
		return {
			loading: false,
			authForm: {
				realname: '',
				idNumber: '',
				idCardFront: '',
				idCardReverse: '',
				introduce: '',
				group: '',
				position: ''
			},
			rules: {
				realname: [
					{
						required: true,
						message: '真实姓名不能为空',
						trigger: 'blur'
					}
				],
				idNumber: [
					{
						required: true,
						message: '身份证号不能为空',
						trigger: 'blur'
					},
					{
						validator: validator.idNumber,
						trigger: 'blur'
					}
				],
				idCardFront: [
					{
						required: true,
						message: '身份证正面照片不能为空',
						trigger: 'blur'
					}
				],
				idCardReverse: [
					{
						required: true,
						message: '身份证背面照片不能为空',
						trigger: 'blur'
					}
				]
			}
		}
	},
	computed: {
		headers() {
			return {
				sign: encrypt({}, authKey),
				'access-user-token': getCookie('access-user-token')
			}
		},
		action() {
			return `${server}/index/user/uploadImage`
		}
	},
	methods: {
		handleUploadSuccess(res, key) {
			console.log(res)
			if (res.status == 1) {
				this.authForm[key] = res.data.file
			} else {
				this.$message.error(res.message)
			}
		},
		beforeUpload(file) {
			if (file.size > 2 * 1024 * 1024) {
				this.$message.error('图片尺寸过大，请选择2M大小以下的图片上传')
				return false
			}
		},
		submit() {
			this.$refs.authForm.validate(valid => {
				if (valid) {
					this.loading = true
					const {
						realname,
						idNumber,
						idCardFront,
						idCardReverse,
						introduce,
						group,
						position
					} = this.authForm
					postData('/index/business', {
						real_name: realname,
						id_number: idNumber,
						front_pic: idCardFront,
						back_pic: idCardReverse,
						introduce,
						group,
						position
					})
						.then(
							() => {
								this.$message.success(
									'提交成功，请耐心等待认证结果'
								)
								this.$router.push('/')
							},
							err => {
								console.log(err)
							}
						)
						.finally(() => {
							this.loading = false
						})
				}
			})
		}
	}
}
</script>

<style>
</style>
