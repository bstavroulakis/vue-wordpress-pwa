import * as types from '../mutation-types'
import Config from '../../app.config.js'

const state = {
  sidebar: {
    opened: false,
    hidden: false
  },
  items:[]
}

// mutations
const mutations = {

  [types.BLOGMENU_UPDATED] (state, menu) {
    state.items = menu.items;
  }

}

export default {
  state,
  mutations
}