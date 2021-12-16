import { mount, shallowMount } from '@vue/test-utils'
import AlertModal from '@/components/molecules/AlertModal.vue'
import Button from '@/components/atoms/Button.vue'

describe('<AlertModal />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(AlertModal, {
      slots: { default: 'Hello world!', button: 'Click me' },
      stubs: { Modal: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking on the button', () => {
    it('should emit a confirm event', () => {
      const wrapper = mount(AlertModal, { stubs: { Modal: true } })
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().confirm).toBeTruthy()
    })
  })
})
