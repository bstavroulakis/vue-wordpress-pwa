import Config from './app.config.js';
import * as types from './store/mutation-types'
import store from './store'

let appCache = require('./app.service.cache.js').default;

let wordpressService = {
  cacheRequest(context, path, cacheTime){
    return new Promise((resolve, reject) => {
      appCache.get(context, path, cacheTime)
      .then(response => {resolve(response)})
      .catch(err => {store.dispatch('showNotification', 'Oops! Looks like you are offline or the service is unavailable'); reject(err)});
    })
  },
  getSettings(context) {
    return this.cacheRequest(context, Config.wpDomain + `wp-json?fields=`, 24 * 60 * 60)
      .then(response => {store.commit(types.BLOGSETTINGS_UPDATED, response.body)})
      .catch(error => Promise.reject(error));
    },
  getMenuByName(context, menuName) {
    let self = this;
    return this.cacheRequest(context, Config.wpDomain + `wp-json/wp-api-menus/v2/menus/?name=${menuName}`, 24 * 60 * 60)
      .then(response => {self.getMenu(context,response.body[0].term_id)})
      .catch(error => {Promise.reject(error)});
  },
  getMenu(context, id){
    return this.cacheRequest(context, Config.wpDomain + `wp-json/wp-api-menus/v2/menus/${id}`, 24 * 60 * 60)
      .then(response => {store.commit(types.BLOGMENU_UPDATED, response.body)})
      .catch(error => Promise.reject(error));
  },
  getCategory(context, id, slug){
    let path = Config.wpDomain + `wp-json/wp/v2/categories/${id}`;
    if(!id && slug){
      path = Config.wpDomain + `wp-json/wp/v2/categories/?slug=${slug}&fields=id,name,slug,parent,link`;
    }else if(!id && !slug){return Promise.resolve("");}
    return this.cacheRequest(context, path, 15 * 60)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error));
  },
  getCategoryChildren(context, id){
    return this.cacheRequest(context, Config.wpDomain + `wp-json/wp/v2/categories?parent=${id}`, 5 * 60)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error));
  },
  getPostsFromCategories(context, categoryIds, per_page){
    let path = Config.wpDomain + `wp-json/wp/v2/posts?categories=${categoryIds}&per_page=${per_page}&fields=id,slug,date,better_featured_image,excerpt`;
    return this.cacheRequest(context, path, 15 * 60)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error));
  },
  getPosts(context, categoryId, page, per_page, order='desc'){
    let path = Config.wpDomain + `wp-json/wp/v2/posts?categories=${categoryId}&page=${page}&order=${order}&per_page=${per_page}&fields=id,title,slug,date,better_featured_image,excerpt`;
    return this.cacheRequest(context, path, 15 * 60)
      .then(response => {
        var totalPages = (response.headers.map.hasOwnProperty('X-WP-TotalPages')) ? response.headers.map['X-WP-TotalPages'][0] : 0;
        totalPages = (response.headers.map.hasOwnProperty('x-wp-totalpages')) ? response.headers.map['x-wp-totalpages'][0] : 0;
        var responseData = {posts:response.body, totalPages:totalPages}; return Promise.resolve(responseData)
      })
      .catch(error => Promise.reject(error));
  },
  getPost(context, postId, postSlug){
    let path = Config.wpDomain + `wp-json/wp/v2/posts/${postId}?fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`;
    if(!postId && postSlug){
      path = Config.wpDomain + `wp-json/wp/v2/posts/?slug=${postSlug}&fields=id,title,slug,tags,date,better_featured_image,content,rest_api_enabler,pure_taxonomies`;
    }
    return this.cacheRequest(context, path, 15 * 60)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error));
  },
  getPage(context, pageId, pageSlug){
    let path = Config.wpDomain + `wp-json/wp/v2/pages/${pageId}`;
    if(!pageId && pageSlug){
      path = Config.wpDomain + `wp-json/wp/v2/pages/?slug=${pageSlug}`;
    }
    return this.cacheRequest(context, path, 15 * 60)
      .then(response => Promise.resolve(response.body))
      .catch(error => Promise.reject(error));
  }
}

export default wordpressService;

/*Vue.http.interceptors.push(function(request, next) {

  // modify method
  request.method = 'POST';

  // modify headers
  request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  request.headers.set('Authorization', 'Bearer TOKEN');

  // continue to next interceptor
  next();
});*/