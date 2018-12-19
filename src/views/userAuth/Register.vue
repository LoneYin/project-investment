<template>
    <div class="auth register">
		<el-card>
			<h5>用户注册</h5>
			<el-form :model="formData" :rules="rules">
				<el-form-item prop="mobile">
					<el-input placeholder="请输入手机号" prefix-icon="el-icon-fa-mobile" v-model="formData.mobile"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-fa-lock" v-model="formData.password"></el-input>
				</el-form-item>
				<div class="auth-link-row">
					<router-link :to="{ path: '/register'}" class="el-form-link pull-left">注册新用户</router-link>
					<router-link :to="{ path: '/forget'}" class="el-form-link pull-right">忘记密码</router-link>
					<a class="el-form-link pull-right auth-btn-qq" href="http://api.dtai88.com/qq">
						<i class="el-icon-fa-qq"></i>
						QQ登录
					</a>
				</div>
				<el-form-item>
					<el-button
						:loading="submitButtonLoading"
						@click="handleSubmit"
						class="auth-btn-submit"
						type="primary"
					>立即登录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>

</style>
