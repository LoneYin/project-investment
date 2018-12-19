<template>
	<div class="common-aside">
		<el-menu
			:default-active="activeMenu"
			active-text-color="#ffffff"
			background-color="#333742"
			class="el-menu-aside"
			router
			text-color="#999999"
		>
			<el-menu-item index="/">
				<i class="el-icon-fa-home"></i>
				<span>首页</span>
			</el-menu-item>

			<el-menu-item-group title="发现">
				<el-menu-item index="/projects">
					<i class="el-icon-menu"></i>
					<span slot="title">创业项目</span>
				</el-menu-item>
				<el-menu-item index="/investors">
					<i class="el-icon-fa-user"></i>
					<span slot="title">投资人</span>
				</el-menu-item>
			</el-menu-item-group>

			<el-menu-item-group title="推荐">
				<el-menu-item index="/optimal_projects">
					<i class="el-icon-fa-thumbs-up"></i>
					<span slot="title">优选</span>
				</el-menu-item>
				<el-menu-item index="/new_projects">
					<i class="el-icon-fa-paper-plane"></i>
					<span slot="title">新品</span>
				</el-menu-item>
				<el-menu-item index="/new_experience_projects">
					<i class="el-icon-fa-suitcase"></i>
					<span slot="title">最新获投</span>
				</el-menu-item>
				<el-menu-item index="/financing_projects">
					<i class="el-icon-fa-money"></i>
					<span slot="title">融资中</span>
				</el-menu-item>
			</el-menu-item-group>

			<el-menu-item-group title="关注">
				<el-menu-item index="/subscribed_tags">
					<i class="el-icon-fa-thumbs-up"></i>
					<span slot="title">关注领域</span>
				</el-menu-item>
				<el-menu-item index="/star_projects">
					<i class="el-icon-star-on"></i>
					<span slot="title">关注项目</span>
				</el-menu-item>
			</el-menu-item-group>

			<div class="main-container-copyright">
				<p>&copy; 爱融吧</p>
				<p>浙ICP备18047475号-2</p>
			</div>
		</el-menu>
	</div>
</template>

<script>
export default {
	data() {
		return {
			activeMenu: '/'
		}
	},
	methods: {
		handleSelect(index) {
			this.activeMenu = index
		}
	},
	watch: {
		$route(to) {
			this.activeMenu = to.path
		}
	},
	created() {
		this.activeMenu = this.$route.path
	}
}
</script>

<style lang="less">
</style>
