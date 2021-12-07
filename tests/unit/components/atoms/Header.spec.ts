import { shallowMount } from '@vue/test-utils'
import Header from '@/components/atoms/Header.vue'

describe('<Header />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
