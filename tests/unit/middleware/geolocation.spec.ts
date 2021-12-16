import { geolocationMiddleware } from '@/middleware/geolocation'
import { createLocalVue, shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import { CreateElement, VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import Vuex, { Store } from 'vuex'

const routerConfig = {
  routes: [{ path: '/geolocation', name: 'Geolocation' }]
}

const storeConfig = {
  modules: {
    user: {
      namespaced: true,
      getters: {
        hasFetchedGeolocation: jest.fn()
      }
    }
  }
}

const mockComponent = {
  mixins: [geolocationMiddleware],
  render: (h: CreateElement) => h('div')
}

describe('geolocation middleware', () => {
  let localVue: VueConstructor<Vue>
  let router: VueRouter
  let store: Store<unknown>
  let componentOptions: ThisTypedShallowMountOptions<Vue> | undefined

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuex)
    router = new VueRouter(routerConfig)
    store = new Vuex.Store(storeConfig)
    componentOptions = { localVue, router, store }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when geolocation hasnt been fetched', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.modules.user.getters.hasFetchedGeolocation.mockReturnValue(false)
    })

    it('should go to the geolocation page', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).toHaveBeenCalledWith({ name: 'Geolocation' })
    })
  })

  describe('when geolocation has been fetched', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.modules.user.getters.hasFetchedGeolocation.mockReturnValue(true)
    })

    it('should do nothing', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).not.toHaveBeenCalled()
    })
  })
})
