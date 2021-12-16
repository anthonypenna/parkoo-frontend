import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { state } from '@/store/banner/state'

describe('state', () => {
  it('should return a default state', () => {
    expect(state()).toEqual<BannerState>({
      text: '',
      type: BannerType.Error,
      visible: false
    })
  })
})
