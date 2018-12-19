import Vue from 'vue'
import Router from 'vue-router'

import guard from './routerGuard'

import Index from '@/views/index/Index.vue'
import Login from '@/views/userAuth/Login.vue'
import Register from '@/views/userAuth/Register.vue'
import Logout from '@/views/userAuth/Logout.vue'
import Forget from '@/views/userAuth/Forget.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		}, {
			path: '/login',
			name: 'login',
			component: Login
		},  {
			path: '/register',
			name: 'register',
			component: Register
		}, {
			path: '/logout',
			name: 'logout',
			component: Logout,
			beforeEnter: guard.confirmLogout
		}, {
			path: '/forget',
			name: 'forget',
			component: Forget
		}
	]
})

export default router
