import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuex from 'vuex'
import Map from '@/components/molecules/Map.vue'
import StreetMarker from '@/components/atoms/StreetMarker.vue'
import * as Mapbox from 'mapbox-gl'

type MapComponent = Wrapper<
  Map & {
    map: Mapbox.Map
    renderChildComponent: (component: unknown) => unknown
    onMapLoad: () => void
  },
  Element
>

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({ on: jest.fn() })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnValue({ addTo: jest.fn() }),
  })),
}))

const localVue = createLocalVue()

localVue.use(Vuex)

const storeOptions = {
  modules: {
    mapbox: {
      namespaced: true,
      state: {
        map: null,
      },
      mutations: {
        setMap: jest.fn(),
      },
      getters: {
        map: jest.fn(),
      },
    },
  },
}

const store = new Vuex.Store(storeOptions)

const propsData = {
  accessToken: 'token',
  center: [0, 0],
  theme: 'theme',
  zoom: 1,
}

describe('<Map />', () => {
  const initialState = JSON.stringify(store.state)

  beforeEach(() => {
    store.replaceState(JSON.parse(initialState))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = mount(Map, { localVue, propsData, store })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when mounted', () => {
    it('should create a new mapbox map', () => {
      mount(Map, { localVue, propsData, store })
      expect(Mapbox.Map).toHaveBeenCalledWith({
        container: 'map',
        accessToken: propsData.accessToken,
        center: propsData.center,
        style: propsData.theme,
        zoom: propsData.zoom,
      })
    })

    it('should save the map instance to the store', () => {
      mount(Map, { localVue, propsData, store }) as MapComponent
      expect(storeOptions.modules.mapbox.mutations.setMap).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    describe('renderChildComponent', () => {
      describe('when the component is undefined', () => {
        it('should do nothing', () => {
          const wrapper = mount(Map, {
            localVue,
            propsData,
            store,
          }) as MapComponent

          wrapper.vm.renderChildComponent(undefined)
          expect(Mapbox.Marker).not.toHaveBeenCalled()
        })
      })

      describe('when the component is defined', () => {
        it('should add a new marker to the map', () => {
          const wrapper = mount(Map, {
            localVue,
            propsData,
            store,
          }) as MapComponent

          const component = { $el: {}, lat: 45, lng: 9 }
          wrapper.vm.renderChildComponent(component)
          expect(Mapbox.Marker).toHaveBeenCalledWith({ element: component.$el })
        })
      })
    })

    describe('onMapLoad', () => {
      it('should render every child component', () => {
        const wrapper = mount(Map, {
          components: { StreetMarker },
          localVue,
          propsData,
          store,
          slots: {
            default: `
                <StreetMarker />
                <StreetMarker />
                <StreetMarker />
          `,
          },
        }) as MapComponent

        wrapper.vm.renderChildComponent = jest.fn()
        wrapper.vm.onMapLoad()
        expect(wrapper.vm.renderChildComponent).toHaveBeenCalledTimes(3)
      })

      it('should emit a load event', () => {
        const wrapper = mount(Map, {
          localVue,
          propsData,
          store,
        }) as MapComponent

        wrapper.vm.onMapLoad()
        expect(wrapper.emitted().load).toBeTruthy()
      })
    })
  })
})
