import Vue from 'vue'

import wordpressService from '../../../app.service'
const getPaths = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    wordpressService.getCategoryChildren(params.categoryId).then((categories) => {
      for (var j = 0; j < categories.length; j++) {
        categories[j].firstPostSlug = ''
      }
      commit('SUBCATEGORIES_UPDATED', categories)
      var postPromises = []
      for (var i = 0; i < categories.length; i++) {
        postPromises.push(getFirstPost({ commit, state }, {categoryId: categories[i].id}))
      }
      Promise.all(postPromises).then(() => {
        resolve()
      })
    }).catch(error => {
      reject(new Error(error))
    })
  })
}

const getFirstPost = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    wordpressService.getPosts(params.categoryId, 1, 1, 'asc').then((data) => {
      for (var j = 0; j < state.paths.length; j++) {
        if (state.paths[j].id === params.categoryId) {
          Vue.set(state.paths[j], 'firstPostSlug', '/category/learning-paths/' + state.paths[j].slug + '/' + data.posts[0].slug)
        }
      }
      resolve()
    }).catch(error => {
      reject(new Error(error))
    })
  })
}

const getPath = ({ commit, state }, params) => {
  if (typeof window !== 'undefined' && state.single && state.single.slug !== params.page) {
    state.posts = []
    state.single = {}
  }

  return new Promise((resolve, reject) => {
    wordpressService.getCategory(null, params.categorySlug, null).then((categories) => {
      wordpressService.getPosts(categories[0].id, 1, 50, 'asc').then((data) => {
        state.posts = data.posts
        getPost({ commit, state }, params).then(() => {
          resolve()
        })
      })
    }).catch(error => {
      reject(new Error(error))
    })
  })
}

const getPost = ({ commit, state }, params) => {
  if (typeof window !== 'undefined' && state.single && state.single.slug !== params.page) {
    state.single = {}
  }

  return new Promise((resolve, reject) => {
    let postId = state.posts[0].id
    for (var i = 0; i < state.posts.length; i++) {
      if (state.posts[i].slug === params.page) {
        postId = state.posts[i].id
        break
      }
    }
    wordpressService.getPost(postId).then((postData) => {
      state.single = postData
      resolve()
    }).catch(error => {
      reject(new Error(error))
    })
  })
}

export {
  getPaths,
  getPath,
  getPost
}
