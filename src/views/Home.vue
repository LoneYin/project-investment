<template>
	<div class="home">
		<el-container class="home-container">
			<el-header style="padding: 0;">
				<CommonHeader/>
			</el-header>
			<el-container class="main-container">
				<el-aside width="180px">
					<CommonAside/>
				</el-aside>
				<el-main v-loading="fullScreenLoading">
					<transition mode="out-in" name="fade">
						<router-view></router-view>
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
// @ is an alias to /src
import CommonAside from '@/components/common/CommonAside.vue';
import CommonHeader from '@/components/common/CommonHeader.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import { getCookie } from '@/utils/cookie';

export default {
	name: 'home',
	components: {
		CommonAside,
		CommonHeader
	},
	computed: {
		...mapState({
			fullScreenLoading: state => state.app.fullScreenLoading
		})
	},
	methods: {
		...mapMutations({
			autoLogin: 'SET_AUTO_LOGIN'
		}),
		...mapActions(['getCurrentUserData'])
	},
	watch: {
		$route() {
			setTimeout(() => {
				document.querySelector('.el-main').scrollTo(0, 0);
			}, 300);
		}
	},
	created() {
		const token = getCookie('access-user-token');
		if (token) {
			this.autoLogin(token);
			this.getCurrentUserData().then(
				() => {},
				err => {
					console.log(err);
					this.$router.push({
						path: '/login'
					});
				}
			);
		}
	}
};
</script>

