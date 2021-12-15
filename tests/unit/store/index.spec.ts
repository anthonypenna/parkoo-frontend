import { RootState } from '@/models/RootState'
import { createLocalVue } from '@vue/test-utils'
import Vue, { VueConstructor } from 'vue'
import Vuex, { Store, StoreOptions } from 'vuex'

const storeOptions: StoreOptions<RootState> = {
  state: {
    hasFetchedGeolocation: false,
    hasFetchedStreets: false,
    showAddStreetModal: false,
    showLoading: true,
    showNoStreetsModal: false,
  },
  mutations: {
    setHasFetchedGeolocation: jest.fn((state, hasFetchedGeolocation) => {
      state.hasFetchedGeolocation = hasFetchedGeolocation
    }),
    setHasFetchedStreets: jest.fn((state, hasFetchedStreets) => {
      state.hasFetchedStreets = hasFetchedStreets
    }),
    setShowAddStreetModal: jest.fn((state, showAddStreetModal) => {
      state.showAddStreetModal = showAddStreetModal
    }),
    setShowLoading: jest.fn((state, showLoading) => {
      state.showLoading = showLoading
    }),
    setShowNoStreetsModal: jest.fn((state, showNoStreetsModal) => {
      state.showNoStreetsModal = showNoStreetsModal
    }),
  },
  getters: {
    hasFetchedGeolocation: jest.fn(state => state.hasFetchedGeolocation),
    hasFetchedStreets: jest.fn(state => state.hasFetchedStreets),
    showAddStreetModal: jest.fn(state => state.showAddStreetModal),
    showLoading: jest.fn(state => state.showLoading),
    showNoStreetsModal: jest.fn(state => state.showNoStreetsModal),
  },
}

describe('store', () => {
  let localVue: VueConstructor<Vue>
  let store: Store<RootState>

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Store(storeOptions)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should have a default state', () => {
    expect(store.state).toEqual<RootState>({
      hasFetchedGeolocation: false,
      hasFetchedStreets: false,
      showAddStreetModal: false,
      showLoading: true,
      showNoStreetsModal: false,
    })
  })

  describe('mutations', () => {
    describe('setHasFetchedGeolocation', () => {
      it('should set the fetched geolocation state', () => {
        store.commit('setHasFetchedGeolocation', true)
        expect(store.state.hasFetchedGeolocation).toEqual(true)
      })
    })

    describe('setHasFetchedStreets', () => {
      it('should set the fetched streets state', () => {
        store.commit('setHasFetchedStreets', true)
        expect(store.state.hasFetchedStreets).toEqual(true)
      })
    })

    describe('setShowAddStreetModal', () => {
      it('should set add street modal state', () => {
        store.commit('setShowAddStreetModal', true)
        expect(store.state.showAddStreetModal).toEqual(true)
      })
    })

    describe('setShowLoading', () => {
      it('should set the loading state', () => {
        store.commit('setShowLoading', false)
        expect(store.state.showLoading).toEqual(false)
      })
    })

    describe('setShowNoStreetsModal', () => {
      it('should set the no streets modal state', () => {
        store.commit('setShowNoStreetsModal', true)
        expect(store.state.showNoStreetsModal).toEqual(true)
      })
    })
  })

  describe('getters', () => {
    describe('hasFetchedGeolocation', () => {
      it('should return the fetched geolocation state', () => {
        expect(store.getters['hasFetchedGeolocation']).toEqual(true)
      })
    })

    describe('hasFetchedStreets', () => {
      it('should return the fetched streets state', () => {
        expect(store.getters['hasFetchedStreets']).toEqual(true)
      })
    })

    describe('showAddStreetModal', () => {
      it('should return the add streets modal state', () => {
        expect(store.getters['showAddStreetModal']).toEqual(true)
      })
    })

    describe('showLoading', () => {
      it('should return the loading state', () => {
        expect(store.getters['showLoading']).toEqual(false)
      })
    })

    describe('showNoStreetsModal', () => {
      it('should return the no streets modal state', () => {
        expect(store.getters['showNoStreetsModal']).toEqual(true)
      })
    })
  })
})
