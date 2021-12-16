import { ModalState } from '@/models/ModalState'
import { mutations } from '@/store/modal/mutations'
import { state } from '@/store/modal/state'

describe('mutations', () => {
  let $state: ModalState

  beforeEach(() => {
    $state = state()
  })

  describe('setShowAddStreetModal', () => {
    it('should set the add street modal visibility', () => {
      mutations.setShowAddStreetModal($state, true)
      expect($state.showAddStreetModal).toEqual(true)
    })
  })

  describe('setShowNoStreetsModal', () => {
    it('should set the no streets modal visibility', () => {
      mutations.setShowNoStreetsModal($state, true)
      expect($state.showNoStreetsModal).toEqual(true)
    })
  })
})
