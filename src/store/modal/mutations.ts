import { ModalState } from '@/models/ModalState'

export const mutations = {
  setShowAddStreetModal: (state: ModalState, showAddStreetModal: boolean) => {
    state.showAddStreetModal = showAddStreetModal
  },

  setShowNoStreetsModal: (state: ModalState, showNoStreetsModal: boolean) => {
    state.showNoStreetsModal = showNoStreetsModal
  }
}
