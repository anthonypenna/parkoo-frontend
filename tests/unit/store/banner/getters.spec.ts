import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { getters } from '@/store/banner/getters'
import { state } from '@/store/banner/state'

describe('getters', () => {
  let $state: BannerState

  beforeEach(() => {
    $state = state()
  })

  describe('text', () => {
    it('should return the banner text', () => {
      expect(getters.text($state)).toEqual('')
    })
  })

  describe('type', () => {
    it('should return the banner type', () => {
      expect(getters.type($state)).toEqual(BannerType.Error)
    })
  })

  describe('visible', () => {
    it('should return the banner visibility', () => {
      expect(getters.visible($state)).toEqual(false)
    })
  })
})
