import Vue from 'vue'
import Router from 'vue-router'
import Config from '../app.config.js'
import * as componentPages  from './routerTypes';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path:'/category/:category/page/:page',
      name:'CategoryWithPagination',
      component: componentPages.CategoryComponent
    },
    {
      path:'/category/learning-paths',
      name:'CategoryLearningPaths',
      component: componentPages.CategoryLearningPathsComponent,
      meta:{id:27}
    },
    {
      path:'/category/learning-paths/:category',
      name:'PostLearningPathsLanding',
      component: componentPages.SingleLearningPathsComponent,
    },
    {
      path:'/category/learning-paths/:category/:post',
      name:'PostLearningPaths',
      component: componentPages.SingleLearningPathsComponent
    },
    {
      path:'/category/newsletter',
      name:'CategoryNewsletterComponent',
      component: componentPages.CategoryNewsletterComponent,
      meta:{id:28}
    },
    {
      path:'/category/:categorySlug/:id',
      name:'SingleWithCategory',
      component: componentPages.SingleComponent
    },
    {
      path:'/category/:id',
      name:'Category',
      component: componentPages.CategoryComponent,
      params:{page:1}
    },
    {
      path:'/page/:id',
      name:'Page',
      component: componentPages.PageComponent
    },
    {
      path:'/:id',
      name:'Post',
      component: componentPages.SingleComponent
    },
    {
      path:'*',
      name:'404',
      component: componentPages.NotFoundComponent
    }
  ]
});

/*store.watch(getters.blogMenu, function(){
  if(menu && menu.state && menu.state.items){
    generateRoutesFromMenu(menu.state.items);
  }
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let themePath = 'theme/' + menu[i].type_label + '.vue'
    let overrideId = menu[i].type_label + menu[i].object_id
    let menuItem = {
      name:menu[i].title, 
      path:menu[i].url,
      meta:{id:menu[i].object_id,type_label:menu[i].type_label}
    };
    if(Config.themeOverrides && Config.themeOverrides[overrideId]){
      let themeOverrideName = Config.themeOverrides[overrideId];
      menuItem.component = require('theme/' + themeOverrideName + '.vue')
    }else{
      menuItem.component = require('theme/' + menu[i].type_label + '.vue')
    }
    let item = menuItem
    if (item.path) {
      routes.push(item)
    }
    if (item.childen && !item.children.length > 0) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  router.addRoutes(routes);
}*/

/*router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})*/

export default router;