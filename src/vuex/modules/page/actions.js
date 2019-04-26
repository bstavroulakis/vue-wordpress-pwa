import wordpressService from '../../../app.service'

const getPage = ({ commit, state }, slug) => {
  return wordpressService.getPage(null, slug).then((page) => {
    commit('PAGE_UPDATED', page)
  }).catch(error => {
    console.log(error)
  })
}

export {
  getPage
}
