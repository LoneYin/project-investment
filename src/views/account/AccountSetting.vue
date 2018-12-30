<template>
    <div class="account-setting">
        <el-tabs v-model="activeName">
            <el-tab-pane label="账号信息" name="accountInfo">
                <el-card class="account-section no-border" v-if="userData">
                    <el-row>
                        <el-col class="account-info-left" :span="16">
                            <p>
                                <span class="account-info-title">用户名:</span>
                                <span class="account-info-text">{{userData.user_name}}</span>
                            </p>
                            <p>
                                <span class="account-info-comment">您在本平台对外展示的用户名，建议使用真实姓名</span>
                            </p>
                        </el-col>

                        <el-col class="account-info-right" :span="8">
                            <div class="pull-right button-edit">
                                <i class="el-icon-edit"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="account-info-left" :span="16">
                            <p>
                                <span class="account-info-title">安全邮箱:</span>
                                <span class="account-info-text">暂无安全邮箱</span>
                            </p>
                            <p>
                                <span class="account-info-comment">安全邮箱可以用于登录本平台，重置密码或其它安全验证</span>
                            </p>
                        </el-col>
                        <el-col class="account-info-right" :span="8">
                            <div class="pull-right button-edit">
                                <i class="el-icon-edit"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="account-info-left" :span="16">
                            <p>
                                <span class="account-info-title">安全手机:</span>
                                <span class="account-info-text">{{userData.mobile}}</span>
                            </p>
                            <p>
                                <span class="account-info-comment">安全邮箱可以用于登录本平台，重置密码或其它安全验证</span>
                            </p>
                        </el-col>
                        <el-col class="account-info-right" :span="8">
                            <div class="pull-right button-edit">
                                <i class="el-icon-edit"></i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="account-info-left" :span="16">
                            <p>
                                <span class="account-info-title">账号密码</span>
                            </p>
                            <p>
                                <span class="account-info-comment">用于保护账号信息和登录安全</span>
                            </p>
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
    padding-bottom: 20px;
    background: #fff;
    .el-row {
        border-bottom: 1px solid #e5e5e5;
        padding: 20px 0;
    }
    .account-info-left {
        text-align: left;
        .account-info-title {
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            color: #333;
            padding-right: 10px;
        }
        .account-info-comment {
            display: inline-block;
            line-height: 28px;
            font-size: 14px;
        }
    }
    .button-edit {
        margin-top: 5px;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: #178fe6;
        color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
    }
}
</style>
