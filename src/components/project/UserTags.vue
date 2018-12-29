<template>
	<div class="user-tags">
		<div class="user-tags-left">
			<div class="user-tags-title">关注领域</div>
			<div v-if="userTags">
				<div v-if="userTags.length > 0">
					<span class="tags-suggestion">您关注了{{userTags.length}}个领域</span>
					<p>
						<span v-for="item in userTags" :key="item.tag_id" class="tags-item-span">
							<i class="el-icon-fa-tags"></i>
							{{item.name}}
						</span>
					</p>
				</div>
				<div v-else>
					<span class="tags-suggestion">您还未关注任何标签，请点击标签管理关注标签</span>
				</div>
			</div>
		</div>
		<div class="user-tag-right" @click="dialogVisible = true">
			<i class="el-icon-fa-cog"></i>标签管理
		</div>
		<el-dialog title="标签管理" :visible.sync="dialogVisible" width="32%" custom-class="tags-manage">
			<div class="tags-manage-user">
				<p class="tags-manage-title">已关注标签</p>
				<ul style="min-height: 40px;">
					<li
						class="tags-item"
						v-for="item in userTags"
						:key="item.tag_id"
						@click="deleteTag(item.tag_id)"
					>
						{{item.name}}
						<i class="el-icon-close"></i>
					</li>
				</ul>
			</div>
			<div class="tags-manage-tags">
				<p class="tags-manage-title">推荐标签</p>
				<ul>
					<li
						class="tags-item"
						v-for="item in tagsList"
						:key="item.tag_id"
						@click="addTag(item.tag_id)"
					>{{item.name}}</li>
				</ul>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { postData, delData } from '@/http'
export default {
	data() {
		return {
			dialogVisible: false
		}
	},
	computed: {
		...mapState({
			tagsList: state => state.discovery.tagsList,
			userTags: state => state.discovery.userTags
		})
	},
	methods: {
		...mapActions(['getTagsList', 'getUserTags']),
		addTag(tagId) {
			postData('/index/user/addUserTag', {
				tag_id: tagId
			}).then(() => {
				this.getUserTags()
				this.$emit('refreshList')
			}, err => {
				console.log(err)
			})
		},
		deleteTag(tagId) {
			delData(`/index/user/deleteUserTag/${tagId}`).then(
				() => {
					this.getUserTags()
					this.$emit('refreshList')
				}, err => {
					console.log(err)
				})
		}
	},
	created() {
		!this.tagsList && this.getTagsList()
		!this.userTags && this.getUserTags()
	}
}
</script>
