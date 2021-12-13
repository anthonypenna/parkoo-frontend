import { shallowMount } from '@vue/test-utils'
import Fade from '@/components/atoms/Fade.vue'

describe('<Fade />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Fade)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
