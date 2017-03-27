import wordpressService from '../../../app.service'
const getCategory = ({commit, state, dispatch}, params) => {
  return new Promise((resolve, reject) => {
    if (!params.categorySlug && !params.parentId) {
      params.categorySlug = state.categories[0].slug
    }
    wordpressService.getCategory(null, params.categorySlug, params.parentId).then((categories) => {
      commit('CATEGORY_UPDATED', categories)
      var postPromises = []
      if (!params.page) {
        params.page = 1
      }
      state.page = params.page
      for (var i = 0; i < categories.length; i++) {
        postPromises.push(getCategoryPosts({commit, state}, {categoryId: categories[i].id, page: params.page}))
      }
      Promise.all(postPromises).then(() => {
        resolve()
      })
    }).catch(error => {
      reject(error)
    })
  })
}

const getCategoryPosts = ({commit, state}, params) => {
  return new Promise((resolve, reject) => {
    wordpressService.getPosts(params.categoryId, params.page, 6).then((category) => {
      commit('CATEGORY_POSTS_UPDATED', {categoryId: params.categoryId, posts: category.posts, totalPages: category.totalPages})
      resolve()
    }).catch(error => {
      reject('ERROR:', error)
    })
  })
}

const getPost = ({commit, state}, postSlug) => {
  return wordpressService.getPost(null, postSlug).then((post) => {
    commit('POST_UPDATED', post[0])
  }).catch(error => {
    console.log('ERROR:', error)
  })
}

export {
  getCategory,
  getCategoryPosts,
  getPost
}
