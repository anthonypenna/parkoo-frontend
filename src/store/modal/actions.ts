import { ModalState } from '@/models/ModalState'
import { ActionContext } from 'vuex'

export const actions = {
  showAddStreetModal: (store: ActionContext<ModalState, unknown>) => {
    store.commit('setShowNoStreetsModal', false)
    store.commit('setShowAddStreetModal', true)
  },

  showNoStreetsModal: (store: ActionContext<ModalState, unknown>) => {
    store.commit('setShowAddStreetModal', false)
    store.commit('setShowNoStreetsModal', true)
  }
}
