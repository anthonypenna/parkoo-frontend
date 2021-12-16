import { shallowMount } from '@vue/test-utils'
import Overlay from '@/components/atoms/Overlay.vue'

describe('<Overlay />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Overlay, { slots: { default: 'Hello world!' } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
