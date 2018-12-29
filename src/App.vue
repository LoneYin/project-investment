<template>
	<div id="app">
		<Home/>
	</div>
</template>
<script>
import Home from '@/views/Home.vue'
export default {
	components: {
		Home
	}
}
</script>

<style lang="less">
#app {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
