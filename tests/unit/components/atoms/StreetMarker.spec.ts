import { shallowMount } from '@vue/test-utils'
import StreetMarker from '@/components/atoms/StreetMarker.vue'

describe('<StreetMarker />', () => {
  describe('when not cleaned tomorrow', () => {
    it('should render correctly', () => {
      const wrapper = shallowMount(StreetMarker)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when cleaned tomorrow', () => {
    it('should render correctly', () => {
      const wrapper = shallowMount(StreetMarker, { propsData: { cleanedTomorrow: true } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
