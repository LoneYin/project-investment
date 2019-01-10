<template>
	<div class="account-information">
		<el-tabs v-model="activeName">
			<el-tab-pane label="消息列表" name="informationList">
				<el-card class="no-border account-section information-list-content">
					<ul v-if="informationList && informationList.length > 0" class="information-list scroll">
						<li v-for="item in informationList" :key="item.message_id" class="information-item">
							<el-row>
								<el-col style="width: 150px;" class="item-time">
									<span>{{item.create_time.substring(0, 10)}}</span>
								</el-col>
								<el-col style="width: 400px;" class="item-content">
									<span>{{item.content}}</span>
								</el-col>
								<el-col class="pull-right" style="width: 200px;" v-if="item.from_user">
									<el-button size="small" type="primary" @click="reply(item.message_id, 3)">同意</el-button>
									<el-button size="small" type="danger" @click="reply(item.message_id, 4)">拒绝</el-button>
								</el-col>
							</el-row>
						</li>
					</ul>
					<div class="none-infomation" v-else>暂无消息记录</div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getData } from '@/http'
export default {
	data() {
		return {
			activeName: 'informationList'
		}
	},
	computed: {
		...mapState({
			informationList: state => state.user.informationList
		})
	},
	methods: {
		...mapActions(['getInformationList']),
		reply(messageId, replyCode) {
			getData('/index/reply', {
				message_id: messageId,
				is_agree: replyCode
			}).then(
				() => {
					this.$message.success('操作成功')
					this.getInformationList()
				},
				err => {
					console.log(err)
				}
			)
		}
	},
	created() {
		!this.informationList && this.getInformationList()
	}
}
</script>