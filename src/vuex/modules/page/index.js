import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const defaultState = {
  single: {}
}

const inBrowser = typeof window !== 'undefined'
// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
