import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'

export const streetCreation = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}
