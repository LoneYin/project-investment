import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import app from './modules/app'
import discovery from './modules/discovery'
import project from './modules/project'
import investor from './modules/investor'

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
		discovery,
		project,
		investor
	}
})
