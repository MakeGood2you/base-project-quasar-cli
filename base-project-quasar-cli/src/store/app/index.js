import state from './app.state'
import * as getters from './app.getters'
import * as mutations from './app.mutations'
import * as actions from './app.actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
