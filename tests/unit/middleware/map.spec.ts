import { mapMiddleware } from '@/middleware/map'
import { createLocalVue, shallowMount, ThisTypedShallowMountOptions } from '@vue/test-utils'
import { CreateElement, VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import Vuex, { Store } from 'vuex'

const routerConfig = {
  routes: [{ path: '/geolocation', name: 'Geolocation' }]
}

const storeConfig = {
  getters: {
    isReadyToLoadMap: jest.fn()
  }
}

const mockComponent = {
  mixins: [mapMiddleware],
  render: (h: CreateElement) => h('div')
}

describe('map middleware', () => {
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

  describe('when the map isnt ready to be loaded', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.getters.isReadyToLoadMap.mockReturnValue(false)
    })

    it('should go to the geolocation page', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).toHaveBeenCalledWith({ name: 'Geolocation' })
    })
  })

  describe('when the map is ready to be loaded', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.getters.isReadyToLoadMap.mockReturnValue(true)
    })

    it('should do nothing', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).not.toHaveBeenCalled()
    })
  })
})
