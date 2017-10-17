import wordpressService from '../../../app.service'
import defaultState from './defaultState'

const getCategoryPromises = ({commit, state}, responseCategories, page) => {
  var postPromises = []
  for (var i = 0; i < responseCategories.length; i++) {
    const responseCategory = responseCategories[i]
    const category = {
      id: responseCategory.id,
      name: responseCategory.name,
      title: responseCategory.name,
      slug: responseCategory.slug,
      better_featured_image: responseCategory.better_featured_image
    }
    postPromises.push(getCategoryPosts({commit, state}, {category, page}))
  }

  return postPromises
}

const getCategory = ({commit, state, dispatch}, params) => {
  if (!params.page) {
    params.page = 1
  }

  if (state.categories &&
    state.categories.length > 0 &&
    state.categories[0].slug === params.categorySlug &&
    state.page === params.page) {
    return
  }

  if (state) {
    Object.assign(state, {}, defaultState)
  }

  return new Promise((resolve, reject) => {
    wordpressService.getCategory(null, params.categorySlug, params.parentId).then((responseCategories) => {
      state.page = params.page

      const postPromises = getCategoryPromises({commit, state}, responseCategories, params.page)
      Promise.all(postPromises).then(resolveCategories => {
        state.categories = resolveCategories
        resolve()
      })
    }).catch(error => {
      reject(error)
    })
  })
}

const getCategoryPosts = ({commit, state}, params) => {
  return new Promise((resolve, reject) => {
    wordpressService.getPosts(params.category.id, params.page, 6).then((category) => {
      params.category.posts = category.posts
      params.category.totalPages = category.totalPages
      resolve(params.category)
    }).catch(error => {
      reject(new Error(error))
    })
  })
}

const getPost = ({commit, state}, postSlug) => {
  if (state.single &&
    state.single.slug === postSlug) {
    return
  }

  if (state) {
    Object.assign(state, {}, defaultState)
  }

  return wordpressService.getPost(null, postSlug).then((post) => {
    commit('POST_UPDATED', post[0])
  }).catch(error => {
    console.log(error)
  })
}

export {
  getCategory,
  getCategoryPosts,
  getPost
}
