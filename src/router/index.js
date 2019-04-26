import Vue from 'vue'
import ThemePageCategory from '../theme/Category.vue'
import ThemePageSingle from '../theme/Single.vue'
import ThemePagePage from '../theme/Page.vue'
import ThemePageCategoryLearningPaths from '../theme/Category-LearningPaths.vue'
import ThemePageSingleLearningPaths from '../theme/Single-LearningPaths.vue'
import OfflineRedirect from '../theme/OfflineRedirect.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/page/:id', component: ThemePagePage },
    { path: '/category/learning-paths', component: ThemePageCategoryLearningPaths },
    { path: '/category/learning-paths/:id/:page?', component: ThemePageSingleLearningPaths },
    { path: '/category/:id/page/:page', component: ThemePageCategory },
    { path: '/category/:categorySlug/:id', component: ThemePageSingle },
    { path: '/category/:id', component: ThemePageCategory, params: { page: 1 } },
    { path: '/offline-redirect', component: OfflineRedirect },
    { path: '/:id', component: ThemePageSingle },
    { path: '/', name: 'Home', redirect: '/category/blog/' }
  ]
})

export default router
