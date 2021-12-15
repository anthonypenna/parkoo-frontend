import { BannerType } from '@/constants/banner'

export interface RootState {
  showLoading: boolean
  hasFetchedGeolocation: boolean
  hasFetchedStreets: boolean
  showNoStreetsModal: boolean
  showAddStreetModal: boolean
  showBanner: boolean
  bannerType: BannerType
  bannerData: string
}
