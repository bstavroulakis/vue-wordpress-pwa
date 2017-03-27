import Vue from 'vue'
import AppLayout from './theme/Layout.vue'
import store from './vuex/store'
import router from './router/index'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...AppLayout
})

export { app, router, store }
