import Vue from 'vue'
import Vuex from 'vuex'
import categoryModule from './modules/category/index'
import pageModule from './modules/page/index'
import learningPathsModule from './modules/learning-paths/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category: categoryModule,
    page: pageModule,
    learningPaths: learningPathsModule
  }
})
