import state from './users.state'
import * as getters from './users.getters'
import * as mutations from './users.mutations'
import * as actions from './users.actions'

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
