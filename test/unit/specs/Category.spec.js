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
        { path: '/category/blog/', component: Category, params: { page: 1, id: 'blog' } }
      ]
    })

    const vm = new Vue({
      el: document.createElement('div'),
      router: router,
      store: store,
      render: h => h('router-view')
    }).$mount()

    console.log(store)
    store.watch(
      (state) => {
        if (state.category && state.category.categories.length > 0) {
          return state.category.categories[0].posts
        }
        return false
      },
      function () {
        expect(vm.$el.querySelector('.category-posts').querySelectorAll('.column').length).to.equal(6)
        done()
      }
    )
  })
})
