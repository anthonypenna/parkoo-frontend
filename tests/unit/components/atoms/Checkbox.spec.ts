import { shallowMount } from '@vue/test-utils'
import Checkbox from '@/components/atoms/Checkbox.vue'

describe('<Checkbox />', () => {
  describe('when unchecked', () => {
    it('should render correctly', () => {
      const wrapper = shallowMount(Checkbox, {
        propsData: { name: 'foo' }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when checked', () => {
    it('should render correctly', () => {
      const wrapper = shallowMount(Checkbox, { propsData: { name: 'foo', checked: true } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('when clicked', () => {
    it('should emit a change event', () => {
      const wrapper = shallowMount(Checkbox)
      wrapper.find('input').trigger('change')
      expect(wrapper.emitted().change).toBeTruthy()
    })
  })
})
