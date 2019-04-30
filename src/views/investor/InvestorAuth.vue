<template>
	<div class="auth-investor" v-loading="isSubmiting">
		<!-- this is authInvestor -->
		<div class="auth-investor-header">
			<p class="header-title">认证投资人</p>
			<p class="header-subtitle">目前仅会对机构，公司投资部及个人天使投资人发放投资人身份</p>
		</div>
		<div class="auth-investor-form">
			<div class="form-steps">
				<el-steps :active="activeStep" align-center finish-status="success">
					<el-step class="steps-item" description icon="el-icon-edit-outline" title="填写身份信息"></el-step>
					<el-step class="steps-item" description icon="el-icon-tickets" title="填写投资偏好信息"></el-step>
					<el-step class="steps-item" description icon="el-icon-circle-check" title="完成"></el-step>
				</el-steps>
			</div>
			<div class="form-body">
				<!-- primary form -->
				<el-form
					:model="authForm"
					:rules="rules"
					class="form-auth"
					label-width="120px"
					ref="authForm"
					v-show="activeStep == 0"
				>
					<el-form-item label="真实姓名" prop="real_name">
						<el-input placeholder="为保证与创业者的沟通体验，请确保为真实姓名" v-model="authForm.real_name"></el-input>
					</el-form-item>
					<el-form-item class="is-required" label="头像">
						<el-upload
							:action="action"
							:before-upload="beforeAvatarUpload"
							:data="{type: 'investor'}"
							:headers="headers"
							:on-success="handleAvatarSuccess"
							:show-file-list="false"
							class="avatar-uploader"
							name="image"
						>
							<img :src="authForm.portrait" class="avatar" v-if="authForm.portrait">
							<i class="el-icon-plus avatar-uploader-icon" v-else></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input placeholder="请输入您的邮箱" v-model="authForm.email"></el-input>
					</el-form-item>
					<el-form-item label="微信" prop="wechat">
						<el-input placeholder="请输入您的微信号" v-model="authForm.wechat"></el-input>
					</el-form-item>
					<el-form-item label="职位" prop="position">
						<el-input placeholder="请输入您的职位" v-model="authForm.position"></el-input>
					</el-form-item>
					<el-form-item label="个人履历" prop="resume">
						<el-input :rows="3" placeholder="请输入您的个人履历" type="textarea" v-model="authForm.resume"></el-input>
					</el-form-item>
					<el-form-item label="地区" prop="region_id">
						<el-select placeholder="请选择地区" v-model="authForm.region_id">
							<el-option
								:key="item.region_id"
								:label="item.name"
								:value="item.region_id"
								v-for="item in regionData"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="投资身份" prop="identity">
						<el-radio label="1" v-model="authForm.identity">个人投资人</el-radio>
						<el-radio label="2" v-model="authForm.identity">机构投资人</el-radio>
					</el-form-item>
					<el-form-item label="邀请码">
						<el-input placeholder="请输入邀请码 (选填)" v-model="authForm.invitation_code"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button @click="handleFirstStep('authForm')" type="primary">下一步，填写投资偏好信息</el-button>
					</el-form-item>
				</el-form>
				<!-- extra form -->
				<el-form :model="extraForm" class="form-extra" label-width="120px" v-show="activeStep == 1">
					<el-form-item label="偏好投资领域">
						<el-checkbox-group v-model="extraForm.industry_id">
							<el-checkbox
								:key="item.industry_id"
								:label="item.industry_id"
								v-for="item in industryData"
							>{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="偏好轮次">
						<el-checkbox-group v-model="extraForm.round_id">
							<el-checkbox
								:key="item.round_id"
								:label="item.round_id"
								v-for="item in roundData"
							>{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="投资偏好金额">
						<el-row>
							<el-col :span="6">
								<el-input-number :controls="false" placeholder="最小金额" v-model="extraForm.preference_price1"></el-input-number>
							</el-col>
							<el-col :span="1" style="text-align: center; color: #999;">-</el-col>
							<el-col :span="6">
								<el-input-number :controls="false" placeholder="最大金额" v-model="extraForm.preference_price2"></el-input-number>
							</el-col>
							<el-col :span="2" style="text-align: center; color: #999;">万</el-col>
							<el-col :span="6">
								<el-radio label="1" v-model="extraForm.preference_price_unit">人民币</el-radio>
								<el-radio label="2" v-model="extraForm.preference_price_unit">美元</el-radio>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button @click="activeStep = 0">返回上一步</el-button>
						<el-button @click="handleSecondStep" type="primary">提交您的投资偏好信息</el-button>
					</el-form-item>
				</el-form>
				<!-- finished -->
				<div class="on-success" v-show="activeStep == 2">
					<p>您的信息已登记，请耐心等待认证结果</p>
					<div>
						<el-button @click="handleBack" type="primary">返回首页</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import encrypt from '@/utils/encrypt'
import { server, authKey, postData } from '@/http'
import { getCookie } from '@/utils/cookie'
import validator from '@/utils/validator'

export default {
	name: 'investorAuth',
	data() {
		return {
			isSubmiting: false,
			activeStep: 0,
			authForm: {
				real_name: '',
				position: '',
				portrait: '',
				region_id: undefined,
				resume: '',
				email: '',
				wechat: '',
				identity: '',
				invitation_code: ''
			},
			extraForm: {
				preference_price1: undefined,
				preference_price2: undefined,
				preference_price_unit: '1',
				industry_id: [],
				round_id: []
			},
			rules: {
				real_name: [{ required: true, message: '真实姓名不能为空' }],
				email: [
					{ required: true, message: '邮箱不能为空' },
					{
						validator: validator.email,
						trigger: 'blur'
					}
				],
				position: [{ required: true, message: '职位不能为空' }],
				region_id: [{ required: true, message: '所在地区不能为空' }],
				identity: [{ required: true, message: '投资身份不能为空' }]
			}
		}
	},
	computed: {
		...mapState({
			regionData: state => state.discovery.areaList,
			roundData: state => state.discovery.roundList,
			industryData: state => state.discovery.industryList
		}),
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
		...mapActions(['getAreaList', 'getRoundList', 'getIndustryList']),
		handleAvatarSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.authForm.portrait = res.data.file
			} else {
				this.$message.error(res.message)
			}
		},
		beforeAvatarUpload(file) {
			if (file.size > 2 * 1024 * 1024) {
				this.$message.error('图片尺寸过大，请选择2M大小以下的图片上传')
				return false
			}
		},
		handleFirstStep(name) {
			if (!this.authForm.portrait) {
				this.$message.error('您还未上传头像')
				return
			}
			this.$refs[name].validate(valid => {
				if (valid) {
					this.activeStep = 1
				}
			})
		},
		handleSecondStep() {
			this.isSubmiting = true
			postData('/index/investor', {
				...this.authForm,
				...this.extraForm
			})
				.then(
					res => {
						console.log(res)
						this.$message.success('提交成功')
						this.activeStep = 2
					},
					err => {
						console.log(err)
					}
				)
				.finally(() => {
					this.isSubmiting = false
				})
		},
		handleBack() {
			this.$router.push({ path: '/' })
		}
	},
	created() {
		!this.regionData && this.getAreaList()
		!this.roundData && this.getRoundList()
		!this.industryData && this.getIndustryList()
	}
}
</script>
