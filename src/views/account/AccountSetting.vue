<template>
	<div class="account-setting">
		<el-tabs v-model="activeName">
			<el-tab-pane label="账号信息" name="accountInfo">
				<el-card class="account-section no-border" v-if="userData">
                    <el-row>
                        <el-col class="account-info-left" :span="16">
                            <span class="account-info-title"></span>
                            <span class="account-info-text"></span>
                        </el-col>
                        <el-col class="account-info-right" :span="8">
                            <div class="pull-right button-edit">
                                <i class="el-icon-edit"></i>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			activeName: 'accountInfo'
		}
    },
    computed: {
        ...mapState({
            userData: state => state.app.currentUserData
        })
    }
}
</script>

<style lang="less">
.account-section {
	width: 870px;
	height: 400px;
	background: #fff;
	
}
</style>
