import { shallowMount } from '@vue/test-utils'
import Modal from '@/components/atoms/Modal.vue'

describe('<Modal />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Modal)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render the correct slot', () => {
    const wrapper = shallowMount(Modal, {
      slots: { default: 'Hello world!' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
