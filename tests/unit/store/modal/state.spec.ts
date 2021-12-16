import { ModalState } from '@/models/ModalState'
import { state } from '@/store/modal/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<ModalState>({
      showAddStreetModal: false,
      showNoStreetsModal: false
    })
  })
})
