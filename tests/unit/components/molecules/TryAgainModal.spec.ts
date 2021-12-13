import { mount } from '@vue/test-utils'
import TryAgainModal from '@/components/molecules/TryAgainModal.vue'
import Button from '@/components/atoms/Button.vue'
import Modal from '@/components/atoms/Modal.vue'

describe('<TryAgainModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(TryAgainModal, {
      slots: { default: 'Hello world!' },
      stubs: { Modal: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking on the try again button', () => {
    it('should emit a try again event', () => {
      const wrapper = mount(TryAgainModal, { stubs: { Modal: true } })
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().tryagain).toBeTruthy()
    })
  })
})
