import wordpressService from '../../../app.service'
const getMenu = ({commit, state}) => {
  return wordpressService.getMenuByName('Main').then((menu) => {
    commit('BLOGMENU_UPDATED', menu.items)
  }).catch(error => {
    console.log('ERROR:', error)
  })
}

export {
  getMenu
}
