import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'

export const user = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
