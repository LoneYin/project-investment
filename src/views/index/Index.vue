<template>
    <div class="index">
        <el-row class="index-row">
            <el-col :span="18" class="index-col-left">
                <div class="index-carousel" v-if="advertisementList">
                    <el-carousel
                        :arrow="advertisementList.sowing_map.length > 1 ? '' : 'never'"
                        :indicator-position="advertisementList.sowing_map.length > 1 ? '' : 'never'"
                        :interval="5000"
                        height="265px"
                        trigger="click"
                    >
                        <el-carousel-item
                            :key="item.news_id"
                            v-for="item in advertisementList.sowing_map"
                        >
                            <img :src="item.img" alt>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="index-projects">
                    <el-card class="no-border">
                        <el-tabs v-model="activeProjectType">
                            <el-tab-pane label="每日精选项目" name="daily_project">
                                <el-row v-if="dailyProjectsList">
                                    <el-col
                                        :key="item.project_id"
                                        :span="8"
                                        class="index-project-item"
                                        v-for="item in dailyProjectsList"
                                    >
                                        <el-card
                                            shadow="hover"
                                            @click.native="toProjectDetail(item.project_id)"
                                        >
                                            <el-row>
                                                <el-col :span="8">
                                                    <div class="index-project-item-logo">
                                                        <img :src="item.logo" alt>
                                                    </div>
                                                </el-col>
                                                <el-col :span="16" class="index-project-item-text">
                                                    <p style="line-height: 20px;">
                                                        <span class="text-name">{{item.name}}</span>
                                                        <span
                                                            class="text-industry_name"
                                                        >{{item.industry_name}}</span>
                                                    </p>
                                                    <p
                                                        class="text-round_name"
                                                    >{{item.round_name || '暂未披露'}}</p>
                                                    <p class="text-summary">{{item.summary}}</p>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="抢手项目" name="hot_project">
                                <el-row v-if="hotProjectsList">
                                    <el-col
                                        :key="item.project_id"
                                        :span="8"
                                        class="index-project-item"
                                        v-for="item in hotProjectsList"
                                    >
                                        <el-card
                                            shadow="hover"
                                            @click.native="toProjectDetail(item.project_id)"
                                        >
                                            <el-row>
                                                <el-col :span="8">
                                                    <div class="index-project-item-logo">
                                                        <img :src="item.logo" alt>
                                                    </div>
                                                </el-col>
                                                <el-col :span="16" class="index-project-item-text">
                                                    <p style="line-height: 20px;">
                                                        <span class="text-name">{{item.name}}</span>
                                                        <span
                                                            class="text-industry_name"
                                                        >{{item.industry_name}}</span>
                                                    </p>
                                                    <p
                                                        class="text-round_name"
                                                    >{{item.round_name || '暂未披露'}}</p>
                                                    <p class="text-summary">{{item.summary}}</p>
                                                </el-col>
                                            </el-row>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
                <div class="index-investors">
                    <el-card class="no-border">
                        <el-tabs v-model="activeInvestorType">
                            <el-tab-pane label="咨询投资人" name="consult_investor">
                                <el-row v-if="consultInvestorsList">
                                    <el-col
                                        :key="item.investor_id"
                                        :span="6"
                                        class="index-investor-item"
                                        v-for="item in consultInvestorsList"
                                    >
                                        <el-card
                                            shadow="hover"
                                            @click.native="toInvestorDetail(item.investor_id)"
                                        >
                                            <div class="index-investor-item-avatar">
                                                <img :src="item.portrait" alt>
                                            </div>
                                            <div class="index-investor-item-text">
                                                <p class="text-real_name">{{item.real_name}}</p>
                                                <p class="text-position">{{item.position}}</p>
                                            </div>
                                            <el-button size="small" type="primary">咨询</el-button>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="活跃投资人" name="active_investor">
                                <el-row v-if="activeInvestorsList">
                                    <el-col
                                        :key="item.investor_id"
                                        :span="6"
                                        class="index-investor-item"
                                        v-for="item in activeInvestorsList"
                                    >
                                        <el-card
                                            shadow="hover"
                                            @click.native="toInvestorDetail(item.investor_id)"
                                        >
                                            <div class="index-investor-item-avatar">
                                                <img :src="item.portrait" alt>
                                            </div>
                                            <div class="index-investor-item-text">
                                                <p class="text-real_name">{{item.real_name}}</p>
                                                <p class="text-position">{{item.position}}</p>
                                            </div>
                                            <el-button size="small" type="primary">咨询</el-button>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                            <el-tab-pane label="最受欢迎" name="popular_investor">
                                <el-row v-if="popularInvestorsList">
                                    <el-col
                                        :key="item.investor_id"
                                        :span="6"
                                        class="index-investor-item"
                                        v-for="item in popularInvestorsList"
                                    >
                                        <el-card
                                            shadow="hover"
                                            @click.native="toInvestorDetail(item.investor_id)"
                                        >
                                            <div class="index-investor-item-avatar">
                                                <img :src="item.portrait" alt>
                                            </div>
                                            <div class="index-investor-item-text">
                                                <p class="text-real_name">{{item.real_name}}</p>
                                                <p class="text-position">{{item.position}}</p>
                                            </div>
                                            <el-button size="small" type="primary">咨询</el-button>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6" class="index-col-right">
                <div class="index-top_right-carousel" v-if="advertisementList">
                    <el-carousel
                        :arrow="advertisementList.upper_right_ad.length > 1 ? '' : 'never'"
                        :indicator-position="advertisementList.upper_right_ad.length > 1 ? '' : 'never'"
                        :interval="5000"
                        height="265px"
                        trigger="click"
                    >
                        <el-carousel-item
                            :key="item.news_id"
                            v-for="item in advertisementList.upper_right_ad"
                        >
                            <img :src="item.img" alt>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="index-users">
                    <el-card class="no-border">
                        <h5 class="index-users-title">认证创业者</h5>
                        <ul v-if="authenticatedUsersList">
                            <li
                                :key="item.user_id"
                                class="index-users-item"
                                v-for="item in authenticatedUsersList"
                            >
                                <el-row>
                                    <el-col :span="10">
                                        <div class="index-users-item-avatar">
                                            <img :src="item.user_image" alt>
                                        </div>
                                    </el-col>
                                    <el-col :span="14" class="index-users-item-text">
                                        <p class="text-full_name">{{item.full_name}}</p>
                                        <p class="text-position">{{item.position}}</p>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </el-card>
                </div>
                <div class="index-bottom_right-carousel" v-if="advertisementList">
                    <el-carousel
                        :arrow="advertisementList.lower_right_ad.length > 1 ? '' : 'never'"
                        :indicator-position="advertisementList.lower_right_ad.length > 1 ? '' : 'never'"
                        :interval="5000"
                        height="265px"
                        trigger="click"
                    >
                        <el-carousel-item
                            :key="item.news_id"
                            v-for="item in advertisementList.lower_right_ad"
                        >
                            <img :src="item.img" alt>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
export default {
    data() {
        return {
            activeProjectType: "daily_project",
            activeInvestorType: "consult_investor"
        };
    },
    computed: {
        ...mapState({
            advertisementList: state => state.index.advertisementList,
            dailyProjectsList: state => state.index.dailyProjectsList,
            hotProjectsList: state => state.index.hotProjectsList,
            authenticatedUsersList: state => state.index.authenticatedUsersList,
            consultInvestorsList: state => state.index.consultInvestorsList,
            activeInvestorsList: state => state.index.activeInvestorsList,
            popularInvestorsList: state => state.index.popularInvestorsList
        })
    },
    methods: {
        ...mapMutations({
            init: "SET_LOADING_STATUS"
        }),
        ...mapActions([
            "getAdvertisementList",
            "getDailyProjectsList",
            "getHotProjectsList",
            "getAuthenticatedUsersList",
            "getRecommendedInvestorsList"
        ]),
        toProjectDetail(id) {
            this.$router.push({
                path: `/project/detail/${id}`
            });
        },
        toInvestorDetail(id) {
            this.$router.push({
                path: `/investor/detail/${id}`
            })
        }
    },
    created() {
        if (!this.advertisementList) {
            this.init(true)
            Promise.all([
                this.getAdvertisementList(),
                this.getDailyProjectsList(),
                this.getHotProjectsList(),
                this.getAuthenticatedUsersList(),
                this.getRecommendedInvestorsList()
            ]).finally(() => {
                this.init(false)
            })
        }
    }
};
</script>