<template>
	<div class="account-setting">
		<el-tabs v-model="activeName">
			<el-tab-pane label="账号信息" name="accountInfo">
				<el-card class="account-section no-border" v-if="userData">
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">用户名:</span>
								<span class="account-info-text">{{userData.user_name}}</span>
							</p>
							<p>
								<span class="account-info-comment">您在本平台对外展示的用户名，建议使用真实姓名</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<el-button class="pull-right" @click="visibleUserName = true" type="primary" size="small">修改</el-button>
						</el-col>
					</el-row>
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">安全邮箱:</span>
								<span class="account-info-text">暂无安全邮箱</span>
							</p>
							<p>
								<span class="account-info-comment">安全邮箱可以用于登录本平台，重置密码或其它安全验证</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<el-button class="pull-right" size="small" type="primary">修改</el-button>
						</el-col>
					</el-row>
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">安全手机:</span>
								<span class="account-info-text">{{userData.mobile}}</span>
							</p>
							<p>
								<span class="account-info-comment">安全手机可以用于登录本平台，重置密码或其它安全验证</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<el-button
								class="pull-right"
								@click="visibleMobileFirst = true"
								type="primary"
								size="small"
							>修改</el-button>
						</el-col>
					</el-row>
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">账号密码</span>
							</p>
							<p>
								<span class="account-info-comment">用于保护账号信息和登录安全</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<el-button class="pull-right" @click="visiblePassword = true" type="primary" size="small">修改</el-button>
						</el-col>
					</el-row>
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">投资人:</span>
								<span class="account-info-text">{{returnAuthStatus(userData.authentication)}}</span>
							</p>
							<p>
								<span class="account-info-comment">成为平台认证投资人，享受众多特权与服务</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<div class="pull-right">
								<el-button v-if="userData.authentication == 1" type="primary" size="small">修改认证信息</el-button>
								<el-button v-if="userData.authentication == 3" type="primary" size="small" @click="$router.push('/investor/auth')">去认证</el-button>
							</div>
						</el-col>
					</el-row>
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">创业者:</span>
								<span class="account-info-text">{{returnAuthStatus(userData.business)}}</span>
							</p>
							<p>
								<span class="account-info-comment">成为平台认证创业者，获得更多投资人的关注</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<div class="pull-right">
								<!-- <el-button type="primary" size="small">修改认证信息</el-button> -->
								<el-button v-if="userData.business == 3" type="primary" size="small" @click="$router.push('/entrepreneur/auth')">去认证</el-button>
							</div>
						</el-col>
					</el-row>

					<!-- dialogs for accountInfo -->
					<el-dialog :visible.sync="visibleUserName" title="更改用户名" width="400px">
						<el-input :placeholder="userData.user_name" v-model="userName"></el-input>
						<el-row style="padding-top: 20px;">
							<el-button @click="changeUserName" style="width: 100%;" size="small" type="primary">确认修改</el-button>
						</el-row>
					</el-dialog>
					<el-dialog :visible.sync="visibleMobileFirst" title="验证当前绑定手机" width="400px">
						<ValidateMobile
							:step="1"
							:mobile="userData.mobile"
							@next="visibleMobileFirst = false; visibleMobileSecond = true"
						/>
					</el-dialog>
					<el-dialog :visible.sync="visibleMobileSecond" title="更改绑定手机号" width="400px">
						<ValidateMobile :step="2" :mobile="userData.mobile" @close="visibleMobileSecond = false"/>
					</el-dialog>
					<el-dialog
						:visible.sync="visiblePassword"
						title="重置密码"
						width="400px"
						custom-class="dialog-reset-password"
					>
						<ResetPassword :mobile="userData.mobile" @close="visiblePassword = false"/>
					</el-dialog>
				</el-card>
			</el-tab-pane>
			<el-tab-pane label="账号授权" name="thirdLogin">
				<el-card class="account-section no-border" v-if="userData">
					<el-row class="account-info-item">
						<el-col class="account-info-left" :span="16">
							<p>
								<span class="account-info-title">QQ登陆:</span>
								<span class="account-info-text">{{userData.bind_qq ? '已绑定' : '未绑定'}}</span>
							</p>
							<p>
								<span class="account-info-comment">允许您通过QQ号登陆平台</span>
							</p>
						</el-col>
						<el-col class="account-info-right" :span="8">
							<div class="pull-right">
								<a :href="`${server}/index/bind_qq_url?mobile=${userData.mobile}`" v-if="!userData.bind_qq">
									<el-button type="primary" size="small">去绑定</el-button>
								</a>
								<el-button v-else type="primary" size="small" @click="visibleBind = true">解除绑定</el-button>
							</div>
						</el-col>
					</el-row>
					<el-dialog title="解除绑定" :visible.sync="visibleBind" width="400px">
						<el-input placeholder="请输入密码以确认" type="password" v-model="confirmPassword"></el-input>
						<span slot="footer" class="dialog-footer">
							<el-button @click="visibleBind = false">取 消</el-button>
							<el-button type="primary" @click="removeBind">确 定</el-button>
						</span>
					</el-dialog>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { server, putData, postData } from '@/http'
import ResetPassword from '@/components/account/ResetPassword.vue'
import ValidateMobile from '@/components/account/ValidateMobile.vue'
export default {
	data() {
		return {
			activeName: 'accountInfo',
			visibleUserName: false,
			// visibleEmail: false,
			visibleMobileFirst: false,
			visibleMobileSecond: false,
			visiblePassword: false,
			visibleBind: false,
			userName: '',
			confirmPassword: ''
		}
	},
	components: {
		ResetPassword,
		ValidateMobile
	},
	computed: {
		...mapState({
			userData: state => state.app.currentUserData
		}),
		server() {
			return server
		}
	},
	methods: {
		...mapActions(['getCurrentUserData']),
		changeUserName() {
			if (
				!this.userName ||
				this.userName.length < 2 ||
				this.userName.length > 24
			) {
				this.$message.error('请输入2-24位的用户名')
				return
			}
			putData(`/index/user/${this.userData.user_id}`, {
				user_id: this.userData.user_id,
				user_name: this.userName
			}).then(
				() => {
					this.visibleUserName = false
					this.$message.success('修改成功')
					this.getCurrentUserData()
				},
				err => {
					console.log(err)
				}
			)
		},
		removeBind() {
			if (this.confirmPassword) {
				postData('/index/unbind', {
					password: this.confirmPassword
				})
					.then(
						() => {
							this.$message.success('解除绑定成功')
							this.getCurrentUserData()
						},
						err => {
							console.log(err)
						}
					)
					.finally(() => {
						this.visibleBind = false
					})
			} else {
				this.$message.error('请输入密码以确认')
			}
		},
		returnAuthStatus(status) {
			switch (status) {
				case 1:
					return '已认证'
				case 2:
					return '待审核'
				case 3:
					return '未认证'
				default:
					return ''
			}
		}
	}
}
</script>
