import {
  createLocalVue,
  shallowMount,
  ThisTypedShallowMountOptions,
  Wrapper,
} from '@vue/test-utils'
import Banner from '@/components/atoms/Banner.vue'
import { VueConstructor } from 'vue'
import { Store } from 'vuex'
import { RootState } from '@/models/RootState'
import Vuex from 'vuex'
import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'

type BannerWrapper = Wrapper<
  Vue & {
    setBannerState(state: BannerState): void
    timeoutID: NodeJS.Timeout
  }
>

const storeConfig = {
  state: {
    bannerData: '',
    bannerType: BannerType.Error,
    hasFetchedGeolocation: false,
    hasFetchedStreets: false,
    showAddStreetModal: false,
    showBanner: false,
    showLoading: false,
    showNoStreetsModal: false,
  },
  mutations: {
    setBannerState: jest.fn((state, bannerState) => {
      state.bannerData = bannerState.text
      state.bannerType = bannerState.type
      state.showBanner = bannerState.visible
    }),
  },
  getters: {
    showBanner: jest.fn(),
    bannerType: jest.fn(),
    bannerData: jest.fn(),
  },
}

describe('<Banner />', () => {
  let localVue: VueConstructor<Vue>
  let store: Store<RootState>
  let componentOptions: ThisTypedShallowMountOptions<Vue>

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Store(storeConfig)
    componentOptions = { localVue, store }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when hidden', () => {
    beforeEach(() => {
      storeConfig.getters.showBanner.mockReturnValue(false)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when visible', () => {
    beforeEach(() => {
      storeConfig.getters.showBanner.mockReturnValue(true)
      storeConfig.getters.bannerType.mockReturnValue(BannerType.Error)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when success type', () => {
    beforeEach(() => {
      storeConfig.getters.showBanner.mockReturnValue(true)
      storeConfig.getters.bannerType.mockReturnValue(BannerType.Success)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when destroyed', () => {
    beforeEach(() => {
      storeConfig.getters.showBanner.mockReturnValue(false)
    })

    it('should clear internal timeout', () => {
      const clearTimeout = jest.spyOn(global, 'clearTimeout')
      const wrapper = shallowMount(Banner, componentOptions) as BannerWrapper

      wrapper.destroy()
      expect(clearTimeout).toHaveBeenCalledWith(wrapper.vm.timeoutID)
    })
  })
})
