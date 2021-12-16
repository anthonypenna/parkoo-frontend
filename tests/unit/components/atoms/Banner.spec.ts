import { createLocalVue, shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils'
import Banner from '@/components/atoms/Banner.vue'
import { VueConstructor } from 'vue'
import { Store } from 'vuex'
import { RootState } from '@/models/RootState'
import Vuex from 'vuex'
import { BannerType } from '@/constants/banner'
import { BannerState } from '@/models/BannerState'

type BannerWrapper = Wrapper<
  Vue & {
    removeTimeout(): void
    setBannerState(state: BannerState): void
    timeoutID: NodeJS.Timeout
  }
>

const storeConfig = {
  modules: {
    banner: {
      namespaced: true,
      getters: {
        text: jest.fn(() => ''),
        type: jest.fn(() => BannerType.Error),
        visible: jest.fn(() => false)
      }
    }
  }
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
      storeConfig.modules.banner.getters.visible.mockReturnValue(false)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when visible', () => {
    beforeEach(() => {
      storeConfig.modules.banner.getters.type.mockReturnValue(BannerType.Error)
      storeConfig.modules.banner.getters.visible.mockReturnValue(true)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when success type', () => {
    beforeEach(() => {
      storeConfig.modules.banner.getters.type.mockReturnValue(BannerType.Success)
      storeConfig.modules.banner.getters.visible.mockReturnValue(true)
    })

    it('should render correctly', () => {
      const wrapper = shallowMount(Banner, componentOptions)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when destroyed', () => {
    beforeEach(() => {
      storeConfig.modules.banner.getters.visible.mockReturnValue(false)
    })

    it('should clear internal timeout', () => {
      const clearTimeout = jest.spyOn(global, 'clearTimeout')
      const wrapper = shallowMount(Banner, componentOptions) as BannerWrapper
      wrapper.destroy()
      expect(clearTimeout).toHaveBeenCalledWith(wrapper.vm.timeoutID)
    })
  })
})
