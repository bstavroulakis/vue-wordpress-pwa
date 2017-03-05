import * as types from '../mutation-types'
import Config from '../../app.config.js'
import pathHelper from '../../utils/pathHelper'

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
    let menuItems = menu.items;
    sanitizeUrl(menuItems);
    state.items = menuItems;
  }

}

function sanitizeUrl(menuItems){
  for(let i = 0; i < menuItems.length; i++){
    menuItems[i].url = pathHelper.getRelativePath(menuItems[i].url)
    if(menuItems[i].children && menuItems[i].children.length > 0){
      sanitizeUrl(menuItems[i].children);
    }
  }
}

export default {
  state,
  mutations
}