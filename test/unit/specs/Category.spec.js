import 'es6-promise/auto'
import Vue from 'vue'
import store from '../../../src/vuex/store'
import VueRouter from 'vue-router'
import Category from '../../../src/theme/Category.vue'

describe('Category.vue', () => {
  it('should load front-end links', (done) => {
    Vue.use(VueRouter)
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

    setTimeout(() => {
      console.log(vm.$el)
      console.log(store.module)
      // expect(vm.$el.querySelector('.category-posts').querySelectorAll('.column').length).to.equal(6)
      done()
    }, 1500)
  })
})
