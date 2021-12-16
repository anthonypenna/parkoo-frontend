import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { mutations } from '@/store/banner/mutations'
import { state } from '@/store/banner/state'

describe('mutations', () => {
  let $state: BannerState

  beforeEach(() => {
    $state = state()
  })

  describe('setText', () => {
    it('should set the banner text', () => {
      mutations.setText($state, 'Hello!')
      expect($state.text).toEqual('Hello!')
    })
  })

  describe('setType', () => {
    it('should set the banner type', () => {
      mutations.setType($state, BannerType.Success)
      expect($state.type).toEqual(BannerType.Success)
    })
  })

  describe('setVisible', () => {
    it('should set the banner visibility', () => {
      mutations.setVisible($state, true)
      expect($state.visible).toEqual(true)
    })
  })
})
