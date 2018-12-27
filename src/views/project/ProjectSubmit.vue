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

				<!-- step1: 基础信息表单 -->
				<!-- primaryForm -->
				<el-form
					:model="primaryForm"
					:rules="primaryRules"
					class="form-primary"
					label-width="160px"
					ref="primaryForm"
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
						<el-input placeholder="一句话概括产品与服务, 30字以内" v-model="primaryForm.synopsis"></el-input>
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

					<!-- typeForm 根据项目类型变化的动态表单项 -->
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

					<!-- roleForm 根据所选角色变化的动态表单项 -->
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
								<el-col :span="9" style="min-width: 180px;">
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
						<el-form-item class="is-required margin-bottom-10" label="商业计划书">
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
							<el-button
								@click="handleFirstStep"
								size="small"
								style="padding: 10px 40px;"
								type="primary"
							>下一步</el-button>
						</el-row>
					</el-form-item>
				</el-form>
				
				<!-- step2: 其它信息表单 -->
				<!-- extraForm -->
				<el-form
					:model="extraForm"
					:rules="extraRules"
					class="form-extra"
					label-width="160px"
					ref="extraForm"
					v-show="activeStep == 1"
				>
					<el-form-item label="产品服务" prop="product_service">
						<el-input
							:rows="4"
							minlength="8"
							placeholder="描述公司所提供的产品和服务是什么，是如何解决痛点和需求的、其它附加的产品和服务是什么"
							type="textarea"
							v-model="extraForm.product_service"
						></el-input>
						<span class="max-length">{{extraForm.product_service.length}}/1000</span>
					</el-form-item>
					<el-form-item label="市场用户" prop="market_users">
						<el-input
							:rows="4"
							minlength="8"
							placeholder="描述公司所针对的细分市场是什么、市场规模及增速如何、目标用户的画像、用户或者行业的痛点和需求"
							type="textarea"
							v-model="extraForm.market_users"
						></el-input>
						<span class="max-length">{{extraForm.market_users.length}}/1000</span>
					</el-form-item>
					<el-form-item label="商业模式" prop="business_model">
						<el-input
							:rows="4"
							minlength="8"
							placeholder="描述公司的商业逻辑、如何盈利、主要的收入来源、以及未来的盈利能力"
							type="textarea"
							v-model="extraForm.business_model"
						></el-input>
						<span class="max-length">{{extraForm.business_model.length}}/1000</span>
					</el-form-item>
					<el-form-item label="运营数据" prop="operational_data">
						<el-input
							:rows="4"
							minlength="8"
							placeholder="描述公司取得的业务进展或增速、用户量/收入/利润等关键业务指标"
							type="textarea"
							v-model="extraForm.operational_data"
						></el-input>
						<span class="max-length">{{extraForm.operational_data.length}}/1000</span>
					</el-form-item>
					<el-form-item label="核心资源" prop="core_resources">
						<el-input
							:rows="4"
							minlength="8"
							placeholder="描述公司相较于竞争对手所具有的优势、对于公司发展有重要意义的资源或亮点"
							type="textarea"
							v-model="extraForm.core_resources"
						></el-input>
						<span class="max-length">{{extraForm.core_resources.length}}/1000</span>
					</el-form-item>
					<p class="dash-line"></p>
					<el-form-item
						:key="index"
						:label="`媒体报道${index == 0? '' : index + 1}`"
						v-for="(item, index) in extraForm.media_coverage"
					>
						<el-row>
							<el-col :span="20">
								<el-input placeholder="请输入主流媒体报道的链接地址" v-model="extraForm.media_coverage[index]"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button @click="deleteMedia(index)" size="small" type="danger">删除</el-button>
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button @click="addMediaCoverage" size="small" type="primary">添加一条</el-button>
					</el-form-item>
					<p class="dash-line"></p>

					<el-form-item>
						<el-button @click="backStep" size="small">返回上一步</el-button>
						<el-button @click="handleSecondStep" size="small" type="primary">下一步</el-button>
					</el-form-item>
				</el-form>

				<!-- step2: 创始人信息表单 -->
				<!-- founderForm -->
				<el-form
					:model="founderForm"
					:rules="founderRules"
					class="form-founder"
					label-width="160px"
					ref="founderForm"
					v-show="activeStep == 2"
				>
					<template v-if="primaryForm.role == 1 || primaryForm.role == 2">
						<el-form-item label="真实姓名" prop="your_name">
							<el-input placeholder="输入中文真实姓名" v-model="founderForm.your_name"></el-input>
						</el-form-item>
						<el-form-item label="职位" prop="your_position">
							<el-input placeholder="输入职位" v-model="founderForm.your_position"></el-input>
						</el-form-item>
						<el-form-item label="手机号码" prop="your_mobile">
							<el-input placeholder="输入真实手机号" v-model="founderForm.your_mobile"></el-input>
						</el-form-item>
						<el-form-item label="公司邮箱" prop="email">
							<el-input placeholder="输入公司邮箱, 便于审核" v-model="founderForm.email"></el-input>
						</el-form-item>
						<el-form-item label="个人微信" prop="wechat">
							<el-input placeholder="输入个人微信号, 方便联系" v-model="founderForm.wechat"></el-input>
						</el-form-item>
						<el-form-item class="is-required person-card" label="个人名片">
							<el-upload
								:action="action"
								:before-upload="beforeCardUpload"
								:data="{type: 'card'}"
								:headers="headers"
								:on-success="handleCardSuccess"
								:show-file-list="false"
								accept="image/*"
								class="person-card-upload"
								name="image"
							>
								<img :src="founderForm.card" v-if="founderForm.card">
								<i class="el-icon-plus avatar-uploader-icon" v-else></i>
							</el-upload>
							<span style="font-size: 12px; color: #999;">建议上传名片尺寸：90mm*50mm</span>
						</el-form-item>
					</template>

					<template v-if="primaryForm.role !== 1">
						<el-form-item class="creator-text">
							<p style="font-weight: 700;">创始人联系方式</p>
							<p style="font-size:12px; color: #999999;">便于更好的完善该项目的信息</p>
						</el-form-item>
						<el-form-item label="姓名" prop="full_name">
							<el-input placeholder="输入中文真实姓名" v-model="founderForm.full_name"></el-input>
						</el-form-item>
						<el-form-item label="职位" prop="position">
							<el-input placeholder="输入职位" v-model="founderForm.position"></el-input>
						</el-form-item>
						<el-form-item label="手机号码" prop="mobile">
							<el-input placeholder="输入真实手机号" v-model="founderForm.mobile"></el-input>
						</el-form-item>
					</template>
					<template v-if="primaryForm.role == 1">
						<el-form-item class="creator-team-text">
							<span @click="showTeamForm">填写创始成员信息, 让投资人更了解你的团队</span>
							<i class="el-icon-fa-angle-double-down" v-if="!teamFormVisible"></i>
							<i class="el-icon-fa-angle-double-up" v-else></i>
						</el-form-item>

						<div class="dash-line"></div>

						<template v-if="teamFormVisible">
							<el-form-item label="团队优势">
								<el-input placeholder="简单介绍你的团队" v-model="founderForm.team_advantage"></el-input>
							</el-form-item>
							<div :key="index" class="creator-team-item" v-for="(item, index) in founderForm.team">
								<p class="creator-team-item-title">
									<span>{{`团队成员${index + 1}`}}</span>
									<i
										@click="removeTeamMember(index)"
										class="el-icon-fa-close"
										title="删除该成员"
										v-if="index !== 0"
									></i>
									<i @click="addTeamMember" class="el-icon-fa-plus" title="添加成员" v-if="index == 0"></i>
								</p>
								<el-form-item label="姓名">
									<el-input placeholder="成员的姓名" v-model="founderForm.team[index].real_name"></el-input>
								</el-form-item>
								<el-form-item label="职位">
									<el-input placeholder="成员的职位" v-model="founderForm.team[index].person_position"></el-input>
								</el-form-item>
								<el-form-item label="介绍">
									<el-input
										placeholder="成员的个人介绍"
										type="textarea"
										v-model="founderForm.team[index].introduce"
									></el-input>
								</el-form-item>
							</div>
						</template>

						<div class="dash-line" v-if="teamFormVisible"></div>
					</template>

					<el-form-item>
						<el-button @click="backStep" size="small">返回上一步</el-button>
						<el-button @click="handleThirdStep" size="small" type="primary">提交项目</el-button>
					</el-form-item>
				</el-form>

				<!-- finished -->
				<div class="on-success" v-show="activeStep == 3">
					<p>您的项目已提交，请耐心等待审核结果</p>
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
	data() {
		return {
			isSubmiting: false,
			activeStep: 0,
			showUploadButton: true,
			teamFormVisible: false,
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
				round_id: [{ required: true, message: '融资轮次不能为空' }],
				financing_price: [
					{ required: true, message: '融资金额不能为空' }
				]
			},
			extraForm: {
				product_service: '', // 产品服务
				market_users: '', // 市场用户
				business_model: '', // 商业模式
				operational_data: '', // 运营数据
				core_resources: '', // 核心资源
				media_coverage: [''] // 媒体报道
			},
			extraRules: {
				product_service: [
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				],
				market_users: [
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				],
				business_model: [
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				],
				operational_data: [
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				],
				core_resources: [
					{
						validator: validator.maxLength(1000),
						trigger: 'blur'
					}
				]
			},
			founderForm: {
				your_position: '', // 你的职位
				your_mobile: '', // 你的手机号
				your_name: '', // 你的姓名
				email: '', // 公司邮箱
				wechat: '', // 个人微信
				card: '', // 个人名片
				full_name: '', // 创始人姓名
				mobile: '', // 创始人手机号码
				position: '', //创始人职位
				team: [], // 创始团队
				team_advantage: '' // 团队优势
			},
			founderRules: {
				your_name: [{ required: true, message: '真实姓名不能为空' }],
				your_position: [{ required: true, message: '职位不能为空' }],
				your_mobile: [
					{ required: true, message: '手机号码不能为空' },
					{
						validator: validator.mobile,
						trigger: 'blur'
					}
				],
				email: [
					{ required: true, message: '公司邮箱不能为空' },
					{
						validator: validator.email,
						trigger: 'blur'
					}
				],
				wechat: [{ required: true, message: '个人微信不能为空' }],
				full_name: [{ required: true, message: '创始人姓名不能为空' }],
				position: [{ required: true, message: '创始人职位不能为空' }],
				mobile: [
					{ required: true, message: '创始人手机号码不能为空' },
					{
						validator: validator.mobile,
						trigger: 'blur'
					}
				]
			}
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
		// 上传相关
		beforeAvatarUpload(file) {
			if (file.size > 2 * 1024 * 1024) {
				this.$message.error('图片尺寸过大，请选择2M大小以下的图片上传')
				return false
			}
		},
		beforeFileUpload(file) {
			if (file.size > 7.5 * 1024 * 1024) {
				this.$message.error(
					'文件尺寸过大，请选择7.5M大小以下的图片上传'
				)
				return false
			}
			this.showUploadButton = false
		},
		beforeCardUpload(file) {
			if (file.size > 2 * 1024 * 1024) {
				this.$message.error('图片尺寸过大，请选择2M大小以下的图片上传')
				return false
			}
		},
		handleAvatarSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.primaryForm.logo = res.data.file
			} else {
				this.$message.error(res.message)
			}
		},
		handleFileSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.primaryForm.business_plan = res.data.file
			} else {
				this.$message.error(res.message)
				this.showUploadButton = true
			}
		},
		handleCardSuccess(res) {
			console.log(res)
			if (res.status == 1) {
				this.founderForm.card = res.data.file
			} else {
				this.$message.error(res.message)
			}
		},
		handleFileError(err) {
			console.log(err)
			this.showUploadButton = true
		},
		handleFileRemove() {
			this.showUploadButton = true
		},
		// 提交相关
		handleFirstStep() {
			if (!this.primaryForm.logo) {
				this.$message.error('请上传公司logo')
				return
			}
			if (
				this.primaryForm.is_financing == 1 &&
				!this.primaryForm.business_plan
			) {
				this.$message.error('请上传商业计划书')
				return
			}
			this.$refs['primaryForm'].validate(
				valid => {
					if (valid) {
						this.activeStep = 1
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		handleSecondStep() {
			this.$refs['extraForm'].validate(
				valid => {
					if (valid) {
						this.activeStep = 2
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		handleThirdStep() {
			if (!this.founderForm.card && (this.primaryForm.role == 1 || this.primaryForm.role == 2)) {
				this.$message.error('请上传名片')
				return
			}
			this.$refs['founderForm'].validate(
				valid => {
					if (valid) {
						this.isSubmiting = true
						postData('/index/project', {
							...this.primaryForm,
							...this.extraForm,
							...this.founderForm
						}).then(
							res => {
								console.log(res)
								this.$message.success('提交成功')
								this.activeStep = 3
							},
							err => {
								console.log(err)
							}
						).finally(() => {
							this.isSubmiting = false
						})
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		backStep() {
			this.activeStep--
		},
		handleBack() {
			this.$router.push({ path: '/' })
		},
		// 表单操作
		addMediaCoverage() {
			this.extraForm.media_coverage.push('')
		},
		deleteMedia(index) {
			this.extraForm.media_coverage.splice(index, 1)
		},
		showTeamForm() {
			this.teamFormVisible = !this.teamFormVisible
			if (this.founderForm.team.length == 0) {
				this.founderForm.team.push({
					person_position: '',
					real_name: '',
					introduce: ''
				})
			}
		},
		addTeamMember() {
			this.founderForm.team.push({
				person_position: '',
				real_name: '',
				introduce: ''
			})
		},
		removeTeamMember(index) {
			this.founderForm.team.splice(index, 1)
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
