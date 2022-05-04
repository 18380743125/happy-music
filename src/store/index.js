import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as gettters from './getters'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: state,
  getters: gettters,
  mutations: mutations,
  actions: actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
