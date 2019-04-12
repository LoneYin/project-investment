<template>
	<div class="login-success">
		<CommonHeader :hideMenu="true"/>
		<div class="success-container">
			<el-row>
				<el-col :span="12">
					<i class="el-icon-fa-check"></i>
				</el-col>
				<el-col :span="12">登陆成功</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import CommonHeader from '../components/common/CommonHeader'
export default {
	components: {
		CommonHeader
	}
}
</script>

<style lang="less">
.login-success {
    width: 700px;
    height: 400px;
    overflow: hidden;
	.success-container {
		width: 300px;
		margin-left: 200px;
		padding-top: 100px;
        font-size: 16px;
        line-height: 50px;
	}

	i {
        font-size: 50px;
        color: #1FCC75;
	}
}
</style>
