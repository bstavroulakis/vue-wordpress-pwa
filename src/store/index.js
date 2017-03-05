import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import app from './modules/app'
import menu from './modules/menu'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  getters,
  actions,
  modules: {
    app,
    menu
  },
  mutations: {
  }
})

export default store