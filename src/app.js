// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import router from './components/router'
import store from './store'
//import ensurePolyfills from './utils/ensurePolyfills'
import App from './theme/Index.vue'
import resource from 'vue-resource'

Vue.config.devtools = false
const { state } = store
sync(store, router)

Vue.use(resource);
/*Vue.http.interceptors.push(function(request, next) {
  next();
})*/

//ensurePolyfills(() => {
    let vue = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
//});