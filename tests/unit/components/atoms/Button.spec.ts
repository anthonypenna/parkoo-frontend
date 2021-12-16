import { shallowMount } from '@vue/test-utils'
import Button from '@/components/atoms/Button.vue'

describe('<Button />', () => {
  describe('with primary theme', () => {
    it('should render correctly', () => {
      const theme = 'primary'
      const wrapper = shallowMount(Button, { propsData: { theme } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('with secondary theme', () => {
    it('should render correctly', () => {
      const theme = 'secondary'
      const wrapper = shallowMount(Button, { propsData: { theme } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('should render the correct slot', () => {
    const wrapper = shallowMount(Button, { slots: { default: 'Hello world!' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
