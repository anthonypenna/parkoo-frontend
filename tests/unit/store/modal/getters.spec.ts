import { ModalState } from '@/models/ModalState'
import { getters } from '@/store/modal/getters'
import { state } from '@/store/modal/state'

describe('getters', () => {
  let $state: ModalState

  beforeEach(() => {
    $state = state()
  })

  describe('showAddStreetModal', () => {
    it('should return the add street modal visibility', () => {
      expect(getters.showAddStreetModal($state)).toEqual(false)
    })
  })

  describe('showNoStreetsModal', () => {
    it('should return the no streets modal visibility', () => {
      expect(getters.showNoStreetsModal($state)).toEqual(false)
    })
  })
})
