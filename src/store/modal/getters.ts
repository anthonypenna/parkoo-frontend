import { ModalState } from '@/models/ModalState'

export const getters = {
  showAddStreetModal: (state: ModalState) => state.showAddStreetModal,
  showNoStreetsModal: (state: ModalState) => state.showNoStreetsModal
}
