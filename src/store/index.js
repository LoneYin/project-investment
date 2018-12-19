import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import app from './modules/app'
import project from './modules/project'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		
	},
	mutations: {

	},
	actions: {

	},
	modules: {
		index,
		app,
		project
	}
})
