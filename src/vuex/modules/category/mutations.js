const POST_UPDATED = (state, post) => {
  state.single = post
}

const RESET_CATEGORIES = (state) => {
  state.categories = []
  state.single = {}
}

export {
  POST_UPDATED,
  RESET_CATEGORIES
}
