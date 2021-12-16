import { RootState } from '@/models/RootState'
import { createLocalVue, shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import Vuex, { Store } from 'vuex'
import Geolocation from '@/views/Geolocation.vue'
import { promisify } from 'util'

const $nextTick = promisify(process.nextTick)

const routerConfig = {
  routes: [
    { path: '/geolocation', name: 'Geolocation' },
    { path: '/streets', name: 'Streets' }
  ]
}

const storeConfig = {
  modules: {
    loading: {
      namespaced: true,
      actions: {
        stopLoading: jest.fn()
      },
      getters: {
        showLoading: jest.fn(() => true)
      },
      mutations: {
        setShowLoading: jest.fn()
      }
    },
    user: {
      namespaced: true,
      actions: {
        getPosition: jest.fn()
      },
      mutations: {
        setHasFetchedGeolocation: jest.fn()
      }
    }
  }
}

describe('<Geolocation />', () => {
  let localVue: VueConstructor<Vue>
  let router: VueRouter
  let store: Store<RootState>
  let componentOptions: ThisTypedShallowMountOptions<Vue>

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuex)
    router = new VueRouter(routerConfig)
    store = new Store(storeConfig)
    componentOptions = { localVue, router, store }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(Geolocation, componentOptions)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when mounted', () => {
    beforeEach(() => {
      router.replace({ name: 'Geolocation' })
    })

    it('should geolocate the user', () => {
      shallowMount(Geolocation, componentOptions)
      expect(storeConfig.modules.user.actions.getPosition).toHaveBeenCalled()
    })

    describe('when geolocation fails', () => {
      beforeEach(() => {
        storeConfig.modules.user.actions.getPosition.mockRejectedValue({})
      })

      it('should stop loading', async () => {
        const wrapper = shallowMount(Geolocation, componentOptions)
        const setShowLoading = jest.spyOn<any, any>(wrapper.vm, 'stopLoading')
        await $nextTick()
        expect(setShowLoading).toHaveBeenCalled()
      })
    })

    describe('when geolocation succeeds', () => {
      beforeEach(() => {
        storeConfig.modules.user.actions.getPosition.mockResolvedValue({})
      })

      it('should set the fetched geolocation state', async () => {
        const wrapper = shallowMount(Geolocation, componentOptions)
        const setHasFetchedGeolocation = jest.spyOn<any, any>(wrapper.vm, 'setHasFetchedGeolocation')
        await $nextTick()
        expect(setHasFetchedGeolocation).toHaveBeenCalledWith(true)
      })

      it('should go to the streets page', async () => {
        shallowMount(Geolocation, componentOptions)
        const push = jest.spyOn(router, 'push')
        await $nextTick()
        expect(push).toHaveBeenCalledWith({ name: 'Streets' })
      })
    })
  })
})
