<template>
	<div class="error-page">
		<div class="error-code error-code-500"></div>
        <p class="error-text">服务器内部错误</p>
        <el-button type="primary" @click="$router.back()">返回</el-button>
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
.error-code-500 {
	background: url('/img/500.png') no-repeat center center;
}
.error-text {
    margin-bottom: 100px;
    font-size: 24px;
    color: #007fff;
}
</style>