import Vue from 'vue'
import Router from 'vue-router'

import guard from './routerGuard'

import Index from '@/views/index/Index.vue'
// userAuth
import Login from '@/views/userAuth/Login.vue'
import Register from '@/views/userAuth/Register.vue'
import Logout from '@/views/userAuth/Logout.vue'
import Forget from '@/views/userAuth/Forget.vue'
// discovery
import Projects from '@/views/discovery/Projects.vue'
import OptimalProjects from '@/views/discovery/OptimalProjects.vue'
import NewProjects from '@/views/discovery/NewProjects.vue'
import NewExperienceProjects from '@/views/discovery/NewExperienceProjects.vue'
import FinancingProjects from '@/views/discovery/FinancingProjects.vue'
import Investors from '@/views/discovery/Investors.vue'

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
		}, {
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
		}, {
			path: '/projects',
			name: 'project',
			component: Projects
		}, {
			path: '/optimal_projects',
			name: 'optimalProjects',
			component: OptimalProjects
		}, {
			path: '/new_projects',
			name: 'newProjects',
			component: NewProjects
		}, {
			path: '/new_experience_projects',
			name: 'newExperienceProjects',
			component: NewExperienceProjects
		}, {
			path: '/financing_projects',
			name: 'financingProjects',
			component: FinancingProjects
		}, {
			path: '/investors',
			name: 'investors',
			component: Investors
		}
	]
})

export default router
