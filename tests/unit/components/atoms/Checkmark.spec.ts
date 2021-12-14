import { shallowMount } from '@vue/test-utils'
import Checkmark from '@/components/atoms/Checkmark.vue'

describe('<Checkmark />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Checkmark)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
