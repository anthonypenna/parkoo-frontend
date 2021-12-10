import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/atoms/Loader.vue'

describe('<Loader />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Loader)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
