import 'es6-promise/auto'
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
import Category from '../../../src/theme/Category.vue'
require('intersection-observer-polyfill/dist/IntersectionObserver.global')
const VueClazyLoad = require('vue-clazy-load')

describe('Category.vue', () => {
  it('loads front-end links', (done) => {
    Vue.use(VueRouter)
    Vue.use(VueClazyLoad)
    const router = new VueRouter({
      routes: [
        { path: '/', component: Category, params: { page: 1, id: 'blog' } }
      ]
    })

    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      store: store,
      render: h => h('router-view')
    }).$mount()

    store.watch(
      (state) => {
        expect(vm.$el.querySelectorAll('.category-posts-loaded .column').length).to.equal(6)
        done()
      }
    )
  })
})
