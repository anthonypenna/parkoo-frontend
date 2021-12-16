import { BannerState } from '@/models/BannerState'

export const BANNER_TIMEOUT = 3000

export enum BannerType {
  Success,
  Error
}

export const CLOSED_BANNER_STATE = Object.freeze<BannerState>({
  text: '',
  type: BannerType.Error,
  visible: false
})
