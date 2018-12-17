<template>
	<div class="common-aside">
		<el-menu
			active-text-color="#ffffff"
			background-color="#333742"
			class="el-menu-aside"
			default-active="/"
			text-color="#999999"
		>
			<el-menu-item index="/">
				<i class="el-icon-fa-home"></i>
				<span>首页</span>
			</el-menu-item>

			<el-menu-item-group title="发现">
				<el-menu-item index="/Projects">
					<i class="el-icon-menu"></i>
					<span slot="title">创业项目</span>
				</el-menu-item>
				<el-menu-item index="/Investors">
					<i class="el-icon-fa-user"></i>
					<span slot="title">投资人</span>
				</el-menu-item>
			</el-menu-item-group>

			<el-menu-item-group title="推荐">
				<el-menu-item index="/OptimalProjects">
					<i class="el-icon-fa-thumbs-up"></i>
					<span slot="title">优选</span>
				</el-menu-item>
				<el-menu-item index="/NewProjects">
					<i class="el-icon-fa-paper-plane"></i>
					<span slot="title">新品</span>
				</el-menu-item>
				<el-menu-item index="/NewExperienceProjects">
					<i class="el-icon-fa-suitcase"></i>
					<span slot="title">最新获投</span>
				</el-menu-item>
				<el-menu-item index="/FinancingProjects">
					<i class="el-icon-fa-money"></i>
					<span slot="title">融资中</span>
				</el-menu-item>
			</el-menu-item-group>

			<el-menu-item-group title="关注">
				<el-menu-item index="/SubscribedTags">
					<i class="el-icon-fa-thumbs-up"></i>
					<span slot="title">关注领域</span>
				</el-menu-item>
				<el-menu-item index="/StarProjects">
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
		return {}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		}
	}
}
</script>

<style lang="less">
.common-aside {
	height: 100%;
	width: 100%;
	position: relative;

	.el-menu-vertical-demo {
		height: 100%;
	}

	.el-menu-aside {
		height: 100%;
    }
    
	.el-menu-item-group__title,
	.el-submenu,
	.el-menu-item {
		text-align: left;
	}

	.main-container-copyright {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 12px;
		line-height: 24px;
		color: rgb(153, 153, 153);
		background-color: rgb(51, 55, 66);
	}
}
.el-menu-item.is-active {
    background: rgb(41, 44, 53) !important;
}
</style>
