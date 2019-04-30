<template>
	<div class="error-page">
		<div class="error-code error-code-404"></div>
        <p class="error-text">找不到页面</p>
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
	</div>
</template>

<script>
export default {}
</script>

<style>
.error-code {
	width: 238px;
	height: 95px;
	background-size: cover;
	margin: 0 auto;
    margin-top: 200px;
    margin-bottom: 20px;
}
.error-code-404 {
	background: url('/img/404.png') no-repeat center center;
}
.error-text {
    margin-bottom: 100px;
    font-size: 24px;
    color: #007fff;
}
</style>
