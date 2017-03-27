import Vue from 'vue'

const CATEGORY_UPDATED = (state, categories) => {
  state.categories = categories
}

const CATEGORY_POSTS_UPDATED = (state, {categoryId, posts, totalPages}) => {
  for (var i = 0; i < state.categories.length; i++) {
    if (state.categories[i].id === categoryId) {
      Vue.set(state.categories[i], 'posts', posts)
      Vue.set(state.categories[i], 'totalPages', totalPages)
      break
    }
  }
}

const POST_UPDATED = (state, post) => {
  state.single = post
}

export {
  CATEGORY_UPDATED,
  CATEGORY_POSTS_UPDATED,
  POST_UPDATED
}
