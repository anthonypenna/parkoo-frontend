import { streetsMiddleware } from '@/middleware/streets'
import {
  createLocalVue,
  shallowMount,
  ThisTypedShallowMountOptions,
} from '@vue/test-utils'
import { CreateElement, VueConstructor } from 'vue'
import VueRouter from 'vue-router'
import Vuex, { Store } from 'vuex'

const routerConfig = {
  routes: [{ path: '/streets', name: 'Streets' }],
}

const storeConfig = {
  getters: {
    hasFetchedStreets: jest.fn(),
  },
}

const mockComponent = {
  mixins: [streetsMiddleware],
  render: (h: CreateElement) => h('div'),
}

describe('streets middleware', () => {
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

  describe('when streets havent been fetched', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.getters.hasFetchedStreets.mockReturnValue(false)
    })

    it('should go to the streets page', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).toHaveBeenCalledWith({ name: 'Streets' })
    })
  })

  describe('when streets have been fetched', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
      storeConfig.getters.hasFetchedStreets.mockReturnValue(true)
    })

    it('should do nothing', () => {
      shallowMount(mockComponent, componentOptions)
      expect(router.push).not.toHaveBeenCalled()
    })
  })
})
