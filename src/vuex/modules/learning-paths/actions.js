import wordpressService from '../../../app.service'
const getPaths = ({commit, state}, params) => {
  return new Promise((resolve, reject) => {
    wordpressService.getCategoryChildren(params.categoryId).then((categories) => {
      commit('SUBCATEGORIES_UPDATED', categories)
      resolve()
    }).catch(error => {
      reject('ERROR:', error)
    })
  })
}

const getPath = ({commit, state}, params) => {
  state.paths = null
  state.single = null
  return new Promise((resolve, reject) => {
    wordpressService.getCategory(null, params.categorySlug, null).then((categories) => {
      wordpressService.getPosts(categories[0].id, 1, 50, 'asc').then((data) => {
        state.posts = data.posts
        getPost({commit, state}, params).then(() => {
          resolve()
        })
      })
    }).catch(error => {
      reject('ERROR:', error)
    })
  })
}

const getPost = ({commit, state}, params) => {
  state.single = null
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
      reject('ERROR:', error)
    })
  })
}

export {
  getPaths,
  getPath,
  getPost
}
