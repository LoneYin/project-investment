import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { getCookie } from '@/utils/cookie'

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
import StarProjects from '@/views/discovery/StarProjects.vue'
import SubscribedTags from '@/views/discovery/SubscribedTags.vue'

// project
import ProjectDetail from '@/views/project/ProjectDetail.vue'
import SubmitProject from '@/views/project/ProjectSubmit.vue'
import Project from '@/views/project/Project.vue'

// investor
import Investor from '@/views/investor/Investor.vue'
import InvestorsList from '@/views/discovery/Investors.vue'
import InvestorAuth from '@/views/investor/InvestorAuth.vue'
import InvestorDetail from '@/views/investor/InvestorDetail.vue'

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
			name: 'projects',
			component: Projects
		}, {
			path: '/project',
			name: 'project',
			component: Project,
			children: [
				{
					path: 'detail/:projectId',
					name: 'projectDetail',
					component: ProjectDetail,
					props: true
				}, {
					path: 'submit',
					name: 'submitProject',
					component: SubmitProject,
					meta: {
						requireAuth: true
					}
				}
			]
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
			path: '/star_projects',
			name: 'starProjects',
			component: StarProjects
		}, {
			path: '/subscribed_tags',
			name: 'subscribedTags',
			component: SubscribedTags
		}, {
			path: '/investors',
			name: 'investors',
			component: InvestorsList
		}, {
			path: '/investor',
			name: 'investor',
			component: Investor,
			children: [
				{
					path: 'auth',
					name: 'investorAuth',
					component: InvestorAuth,
					meta: {
						requireAuth: true
					}
				}, {
					path: 'detail/:investorId',
					name: 'investorDetail',
					component: InvestorDetail,
					props: true
				}
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		const token = getCookie('access-user-token')
		if (token && token !== 'undefined' && token !== 'null') {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})


router.afterEach((to) => {
	store.commit('SET_ACTIVE_INDEX', to.path)
})

export default router
