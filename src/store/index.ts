import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'
import { RootState } from '@/models/RootState'
import Vue from 'vue'
import Vuex from 'vuex'
import { dateStore } from './date'
import { mapboxStore } from './mapbox'
import { streetsStore } from './streets'
import { userStore } from './user'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    showLoading: true,
    hasFetchedGeolocation: false,
    hasFetchedStreets: false,
    showNoStreetsModal: false,
    showAddStreetModal: false,
    showBanner: false,
    bannerData: '',
    bannerType: BannerType.Error,
  },
  mutations: {
    setShowLoading(state, showLoading: boolean) {
      state.showLoading = showLoading
    },
    setHasFetchedGeolocation(state, hasFetchedGeolocation: boolean) {
      state.hasFetchedGeolocation = hasFetchedGeolocation
    },
    setHasFetchedStreets(state, hasFetchedStreets: boolean) {
      state.hasFetchedStreets = hasFetchedStreets
    },
    setShowNoStreetsModal(state, showNoStreetsModal: boolean) {
      state.showNoStreetsModal = showNoStreetsModal
    },
    setShowAddStreetModal(state, showAddStreetModal: boolean) {
      state.showAddStreetModal = showAddStreetModal
    },
    setBannerState(state, bannerState: BannerState) {
      state.bannerData = bannerState.text
      state.bannerType = bannerState.type
      state.showBanner = bannerState.visible
    },
  },
  getters: {
    hasFetchedGeolocation: state => state.hasFetchedGeolocation,
    hasFetchedStreets: state => state.hasFetchedStreets,
    isReadyToLoadMap: state =>
      state.hasFetchedGeolocation && state.hasFetchedStreets,
    showAddStreetModal: state => state.showAddStreetModal,
    showLoading: state => state.showLoading,
    showNoStreetsModal: state => state.showNoStreetsModal,
    showBanner: state => state.showBanner,
    bannerType: state => state.bannerType,
    bannerData: state => state.bannerData,
  },
  modules: {
    mapbox: mapboxStore,
    user: userStore,
    streets: streetsStore,
    date: dateStore,
  },
})
