/**
 * Created by whobird on 17/8/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

import moduleStore from "./modules"

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,

  actions,
  modules: moduleStore,
  //strict: debug,
  plugins: []
})
