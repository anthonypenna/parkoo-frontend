import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'

export const state = (): BannerState => ({
  text: '',
  type: BannerType.Error,
  visible: false
})
