<template>
	<div class="account">
		<el-row>
			<el-col class="account-part-left">
				<el-card class="no-border">
					<div class="user-avatar-container">
						<el-upload
							:action="action"
							:before-upload="beforeAvatarUpload"
							:data="{type: 'avatar'}"
							:headers="headers"
							:on-success="handleAvatarSuccess"
							:show-file-list="false"
							accept="image/*"
							class="avatar-uploader"
							name="image"
						>
							<img v-if="imageUrl" :src="imageUrl" class="avatar">
							<div class="mask">修改头像</div>
						</el-upload>
					</div>
				</el-card>
			</el-col>
			<el-col class="account-part-right">
				<transition mode="out-in" name="fade">
					<router-view></router-view>
				</transition>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import encrypt from '@/utils/encrypt'
import { getCookie } from '@/utils/cookie'
import { server, authKey, putData } from '@/http'

export default {
	data() {
		return {
			imageUrl: ''
		};
	},
	computed: {
		...mapState({
			userData: state => state.app.currentUserData
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
	watch: {
		userData(val) {
			if (val) {
				this.imageUrl = val.user_image || '../../assets/images/default-user.png'
			}
		}
	},
	methods: {
		handleAvatarSuccess(res) {
			if (res.status === 1) {
				this.imageUrl = res.data.file
				putData(`/index/user/${this.userData.user_id}`, {
					user_id: this.userData.user_id,
					user_image: this.imageUrl
				}).then(() => {
					this.$message.success('更新头像成功')
				}, err => {
					console.log(err)
				})
			} else {
				this.$message.error(res.message)
			}
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
			const isLt2M = file.size / 1024 / 1024 < 2

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!')
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!')
			}
			return isJPG && isLt2M
		}
	},
	created() {
		if (this.userData && this.userData.user_image) {
			this.imageUrl = this.userData.user_image
		}
	}

}
</script>