import Home from '@/views/Home.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { VueConstructor } from 'vue'
import VueRouter from 'vue-router'

const routerConfig = {
  routes: [{ path: '/geolocation', name: 'Geolocation' }],
}

describe('<Home />', () => {
  let localVue: VueConstructor<Vue>
  let router: VueRouter

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(VueRouter)
    router = new VueRouter(routerConfig)
  })

  describe('when mounted', () => {
    beforeEach(() => {
      jest.spyOn(router, 'push')
    })

    it('should go to the geolocation page', () => {
      shallowMount(Home, { localVue, router })
      expect(router.push).toHaveBeenCalledWith({ name: 'Geolocation' })
    })
  })
})
