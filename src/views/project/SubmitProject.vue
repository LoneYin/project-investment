<template>
	<div class="submit-project" v-loading="isSubmiting">
		<div class="submit-project-header">
			<p class="header-title">添加创业项目</p>
			<p class="header-subtitle">让投资人更全面的了解你</p>
		</div>
		<div class="submit-project-form">
			<div class="form-steps">
				<el-steps :active="activeStep" align-center finish-status="success">
					<el-step class="steps-item" description icon="el-icon-edit-outline" title="填写基本信息"></el-step>
					<el-step class="steps-item" description icon="el-icon-tickets" title="填写其他信息"></el-step>
					<el-step class="steps-item" description icon="el-icon-fa-users" title="填写创始人信息"></el-step>
					<el-step class="steps-item" description icon="el-icon-circle-check" title="完成"></el-step>
				</el-steps>
			</div>
			<div class="form-body">
				<el-form
					:model="primaryForm"
					:rules="primaryRules"
					class="form-primary"
					label-width="160px"
					v-show="activeStep == 0"
				>
					<el-form-item label="项目名称" prop="name">
						<el-input placeholder="请输入项目名称" v-model="primaryForm.name"></el-input>
					</el-form-item>
					<el-form-item label="工商注册公司全称">
						<el-input placeholder="请输入公司全称" v-model="primaryForm.company_name"></el-input>
					</el-form-item>
					<el-form-item class="is-required" label="项目Logo">
						<el-upload
							:action="action"
							:before-upload="beforeAvatarUpload"
							:data="{type: 'logo'}"
							:headers="headers"
							:on-success="handleAvatarSuccess"
							:show-file-list="false"
							accept="image/*"
							class="avatar-uploader"
							name="image"
						>
							<img :src="primaryForm.logo" class="avatar" v-if="primaryForm.logo">
							<i class="el-icon-plus avatar-uploader-icon" v-else></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="一句话介绍" prop="synopsis">
						<el-input placeholder="一句话概括产品与服务, 30字以内" v-model="primaryForm.company_name"></el-input>
					</el-form-item>
					<el-form-item label="所属领域" prop="industry_id">
						<el-select placeholder="项目类别" v-model="primaryForm.industry_id">
							<el-option
								:key="item.industry_id"
								:label="item.name"
								:value="item.industry_id"
								v-for="item in industryData"
							></el-option>
						</el-select>
					</el-form-item>

					<!-- typeForm -->
					<el-form-item label="项目类型" prop="type">
						<el-select placeholder="产品类型" v-model="primaryForm.type">
							<el-option :value="1" label="Web产品"></el-option>
							<el-option :value="2" label="App应用"></el-option>
							<el-option :value="3" label="Web及App均有"></el-option>
							<el-option :value="4" label="微信公众号"></el-option>
							<el-option :value="5" label="硬件及其他"></el-option>
							<el-option :value="6" label="产品未上线"></el-option>
						</el-select>
					</el-form-item>
					<div class="form-type-content" v-if="primaryForm.type == 1">
						<el-form-item label="公司官网" prop="official_website">
							<el-input placeholder="请填写公司的官网" v-model="primaryForm.official_website"></el-input>
						</el-form-item>
					</div>
					<div class="form-type-content" v-if="primaryForm.type == 2">
						<el-form-item label="公司官网">
							<el-input v-model="primaryForm.official_website"></el-input>
						</el-form-item>
						<p class="comment">iOS与Android下载链接至少填写一个</p>
						<el-form-item label="iOS下载地址" prop="ios_download_address">
							<el-input v-model="primaryForm.ios_download_address"></el-input>
						</el-form-item>
						<el-form-item label="Android下载地址" prop="android_download_address">
							<el-input v-model="primaryForm.android_download_address"></el-input>
						</el-form-item>
					</div>
					<div class="form-type-content" v-if="primaryForm.type == 3">
						<el-form-item label="公司官网" prop="official_website">
							<el-input v-model="primaryForm.official_website"></el-input>
						</el-form-item>
						<p class="comment">iOS与Android下载链接至少填写一个</p>
						<el-form-item label="iOS下载地址" prop="ios_download_address">
							<el-input v-model="primaryForm.ios_download_address"></el-input>
						</el-form-item>
						<el-form-item label="Android下载地址" prop="android_download_address">
							<el-input v-model="primaryForm.android_download_address"></el-input>
						</el-form-item>
					</div>
					<div class="form-type-content" v-if="primaryForm.type == 4">
						<el-form-item label="微信公众号" prop="wechat_subscription">
							<el-input placeholder="请填写微信公众号" v-model="primaryForm.wechat_subscription"></el-input>
						</el-form-item>
					</div>
					<div class="form-type-content" v-if="primaryForm.type == 5">
						<el-form-item label="相关链接">
							<el-input placeholder="请填写相关链接" v-model="primaryForm.related_links"></el-input>
						</el-form-item>
						<el-form-item label="项目概述" prop="summary">
							<el-input
								:rows="4"
								placeholder="可拆分为产品描述、用户群体、项目愿景、竞争对手等方面详细描述, 不超过1000字"
								type="textarea"
								v-model="primaryForm.summary"
							></el-input>
							<span class="max-length">{{primaryForm.summary.length}}/1000</span>
						</el-form-item>
					</div>
					<div class="form-type-content" v-if="primaryForm.type == 6">
						<el-form-item label="项目概述" prop="summary">
							<el-input
								:rows="4"
								placeholder="可拆分为产品描述、用户群体、项目愿景、竞争对手等方面详细描述, 不超过1000字"
								type="textarea"
								v-model="primaryForm.summary"
							></el-input>
							<span class="max-length">{{primaryForm.summary.length}}/1000</span>
						</el-form-item>
					</div>

					<el-form-item label="项目概述" v-if="primaryForm.type !== 5 && primaryForm.type !== 6">
						<el-input
							:rows="4"
							placeholder="可拆分为产品描述、用户群体、项目愿景、竞争对手等方面详细描述, 不超过1000字"
							type="textarea"
							v-model="primaryForm.summary"
						></el-input>
						<span class="max-length">{{primaryForm.summary.length}}/1000</span>
					</el-form-item>
					<el-form-item label="注册地区" prop="region_id">
						<el-select placeholder="选择地区" v-model="primaryForm.region_id">
							<el-option
								:key="item.region_id"
								:label="item.name"
								:value="item.region_id"
								v-for="item in areaData"
							></el-option>
						</el-select>
					</el-form-item>

					<!-- roleForm -->
					<el-form-item label="您的角色" prop="role">
						<el-select placeholder="选择角色" v-model="primaryForm.role">
							<el-option :value="1" label="创始成员"></el-option>
							<el-option :value="2" label="公司员工"></el-option>
							<el-option :value="3" label="投资人"></el-option>
							<el-option :value="4" label="用户"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="融资需求" prop="is_financing" v-if="primaryForm.role == 1">
						<el-select placeholder="选择融资需求" v-model="primaryForm.is_financing">
							<el-option :value="1" label="寻求融资"></el-option>
							<el-option :value="2" label="暂无需求"></el-option>
							<el-option :value="3" label="寻求收购"></el-option>
						</el-select>
					</el-form-item>
					<div class="form-type-content" v-if="primaryForm.is_financing == 1">
						<el-form-item label="融资轮次" prop="round_id">
							<el-select placeholder="选择轮次" v-model="primaryForm.round_id">
								<el-option
									:key="item.round_id"
									:label="item.name"
									:value="item.round_id"
									v-for="item in roundData"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="计划金额" prop="financing_price">
							<el-row>
								<el-col :span="12">
									<el-input-number
										:controls="false"
										placeholder="输入具体金额"
										v-model="primaryForm.financing_price"
									></el-input-number>
								</el-col>
								<el-col :span="2" style="text-align: left;">万</el-col>
								<el-col :span="8">
									<el-select v-model="primaryForm.financing_unit">
										<el-option :value="1" label="人民币"></el-option>
										<el-option :value="2" label="美元"></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item class="is-required" label="商业计划书">
							<el-upload
								:action="action"
								:before-upload="beforeFileUpload"
								:data="{type: 'bp'}"
								:headers="headers"
								:limit="1"
								:on-error="handleFileError"
								:on-remove="handleFileRemove"
								:on-success="handleFileSuccess"
								accept=".doc, .docx, .xlsx, .xls, .pdf"
								class="upload-bp"
								name="image"
							>
								<el-button size="small" type="primary" v-if="showUploadButton">上传文件</el-button>
								<span class="comment" v-if="showUploadButton">请上传小于7.5M的excel/word/PDF文件</span>
							</el-upload>
						</el-form-item>
						<el-form-item label="BP查看设置">
							<el-checkbox v-model="primaryForm.is_bp">需要投资人申请查看BP</el-checkbox>
							<!-- <span class="checkbox-text"></span> -->
						</el-form-item>
					</div>

					<el-form-item label="商业计划书" v-if="primaryForm.is_financing !== 1">
						<el-upload
							:action="action"
							:before-upload="beforeFileUpload"
							:data="{type: 'bp'}"
							:headers="headers"
							:limit="1"
							:on-error="handleFileError"
							:on-remove="handleFileRemove"
							:on-success="handleFileSuccess"
							accept=".doc, .docx, .xlsx, .xls, .pdf"
							class="upload-bp"
							name="image"
						>
							<el-button size="small" v-if="showUploadButton">上传文件</el-button>
							<span class="comment" v-if="showUploadButton">请上传小于7.5M的excel/word/PDF文件</span>
						</el-upload>
					</el-form-item>

					<el-form-item>
						<el-row>
							<el-button type="primary" size="small" style="padding: 10px 40px;">下一步</el-button>
						</el-row>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import encrypt from '@/utils/encrypt'
import { server, authKey } from '@/http'
import { getCookie } from '@/utils/cookie'
import validator from '@/utils/validator'

export default {
	data() {
		return {
			isSubmiting: false,
			activeStep: 0,
			showUploadButton: true,
			primaryForm: {
				name: '', // 项目名称
				industry_id: '', // 项目类别
				synopsis: '', // 一句话简介
				logo: '', // Logo
				role: '', // 角色 1创始成员 2公司员工 3投资人 4用户
				type: '', // 项目类型 1Web产品 2app应用 3web和app均有 4微信公众号 5硬件及其它 6产品未上架
				round_id: '', // 当前轮次
				region_id: '', // 注册地址id
				summary: '', // 项目概述
				detail: '', // 详细介绍
				company_name: '', // 工商注册公司全称
				business_plan: '', // 商业计划书
				official_website: '', // 公司官网
				ios_download_address: '', // IOS下载地址
				android_download_address: '', // 安卓下载地址
				wechat_subscription: '', // 微信公众号
				related_links: '', // 相关链接
				project_overview: '', // 项目概述
				media_coverage: '', // 媒体报道
				product_service: '', // 产品服务
				market_users: '', // 市场用户
				business_model: '', // 商业模式
				operational_data: '', // 运营数据
				core_resources: '', // 核心资源
				financing_price: undefined, // 融资金额
				financing_unit: 1, // 融资金额单位 1人民币 2美元
				is_financing: '', // 1融资中 2不需要融资
				is_bp: false // 0 未选中 1选中
			},
			primaryRules: {
				name: [{ required: true, message: '项目名称不能为空' }],
				synopsis: [
					{ required: true, message: '一句话简介不能为空' },
					{
						validator: validator.synopsis,
						trigger: 'blur'
					}
				],
				industry_id: [{ required: true, message: '所属领域不能为空' }],
				type: [{ required: true, message: '项目类型不能为空' }],
				official_website: [
					{ required: true, message: '公司官网不能为空' }
				],
				wechat_subscription: [
					{ required: true, message: '微信公众号不能为空' }
				],
				summary: [
					{ required: true, message: '一句话简介不能为空' },
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				],
				region_id: [{ required: true, message: '注册地区不能为空' }],
				role: [{ required: true, message: '您的角色不能为空' }],
				is_financing: [{ required: true, message: '融资需求不能为空' }],
				round_id:  [{ required: true, message: '融资轮次不能为空' }],
				financing_price:  [{ required: true, message: '融资金额不能为空' }],
			},
			financingDemands: [
				{
					name: '需求融资',
					value: 1
				},
				{
					name: '暂无需求',
					value: 2
				},
				{
					name: '需求收购',
					value: 3
				}
			]
		}
	},
	computed: {
		...mapState({
			industryData: state => state.discovery.industryList,
			areaData: state => state.discovery.areaList,
			roundData: state => state.discovery.roundList
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
		...mapActions(['getIndustryList', 'getRoundList', 'getAreaList']),
		handleAvatarSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.primaryForm.logo = res.data.fileUrl
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
		handleFileSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.primaryForm.business_plan = res.data.fileUrl
			} else {
				this.$message.error(res.message)
				this.showUploadButton = true
			}
			// if (res.data)
		},
		handleFileError(err) {
			console.log(err)
			this.showUploadButton = true
		},
		handleFileRemove() {
			this.showUploadButton = true
		},
		beforeFileUpload(file) {
			if (file.size > 7.5 * 1024 * 1024) {
				this.$message.error(
					'文件尺寸过大，请选择7.5M大小以下的图片上传'
				)
				return false
			}
			this.showUploadButton = false
		}
	},
	created() {
		!this.industryData && this.getIndustryList()
		!this.areaData && this.getAreaList()
		!this.roundData && this.getRoundList()
	}
}
</script>

<style>
</style>
