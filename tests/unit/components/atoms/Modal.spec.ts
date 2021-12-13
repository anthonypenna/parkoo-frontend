import { createLocalVue, shallowMount } from '@vue/test-utils'
import Modal from '@/components/atoms/Modal.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mapbox: {
      namespaced: true,
      state: {
        map: {
          dragPan: {
            disable: jest.fn(),
            enable: jest.fn(),
          },
          scrollZoom: {
            disable: jest.fn(),
            enable: jest.fn(),
          },
        },
      },
      getters: {
        map: state => state.map,
      },
    },
  },
})

describe('<Modal />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Modal, { localVue, store })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render the correct slot', () => {
    const wrapper = shallowMount(Modal, {
      localVue,
      store,
      slots: { default: 'Hello world!' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
