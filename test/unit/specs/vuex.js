import Vue from 'vue'
import Vuex from 'vuex'
import CategoryData from './mocks/Categories.json'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category: {
      namespaced: true,
      state: { categories: [], page: 1 },
      actions: {
        getCategory ({commit, state}) {
          state.categories = CategoryData
        }
      },
      getters: {
        categories: state => state.categories
      }
    }
  }
})
