import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  blog:{
    settings:{}
  },
  appNotification:{hidden:true, message:""}
}

// mutations
const mutations = {

  [types.SHOW_NOTIFICATION] (state, message) {
    state.appNotification.message = message;
    state.appNotification.hidden = false;
  },

  [types.HIDE_NOTIFICATION] (state) {
    state.appNotification.hidden = true;
  },

  [types.BLOGSETTINGS_UPDATED] (state, response) {
    state.blog.settings = response;
  }

}

const actions = {
  showNotification: ({ state, commit, rootState }, message) => {
    if (message) {
      commit(types.SHOW_NOTIFICATION, message)
    }
  },
  hideNotification: ({ state, commit, rootState }) => {
      commit(types.HIDE_NOTIFICATION);
  }
}

export default {
  state,
  mutations,
  actions
}
