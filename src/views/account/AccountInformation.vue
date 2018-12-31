<template>
    <div>
        <div class="account-information">
            <el-tabs v-model="activeName">
                <el-tab-pane label="消息列表" name="informationList">
                    <el-card class="no-border account-section">

                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            activeName: 'informationList'
        }
    },
    computed: {
        ...mapState({
            informationList: state => state.user.informationList
        })
    },
    methods: {
        ...mapActions(['getInformationList'])
    },
    created() {
        !this.informationList && this.getInformationList()
    }
}
</script>

<style>
</style>
