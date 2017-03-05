const app = state => state.app
const blog = state => state.app.blog
const appNotification = state => state.app.appNotification
const blogMenu = state => state.menu.items
const blogPagingPage = state => state.route.params.page
const routeMetaId = state => state.route.meta.id
const routeParamId = state => state.route.params.id
const routeParamPost = state => state.route.params.post
const routeParams = state => state.route.params

export {
  app,
  blog,
  blogMenu,
  blogPagingPage,
  routeMetaId,
  routeParamId,
  routeParamPost,
  routeParams,
  appNotification
}