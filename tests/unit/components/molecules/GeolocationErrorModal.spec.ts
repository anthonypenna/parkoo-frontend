import { mount } from '@vue/test-utils'
import GeolocationErrorModal from '@/components/molecules/GeolocationErrorModal.vue'
import Button from '@/components/atoms/Button.vue'
import Modal from '@/components/atoms/Modal.vue'

describe('<GeolocationErrorModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(GeolocationErrorModal, { stubs: { Modal: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking the try again button', () => {
    it('should emit a try again event', () => {
      const wrapper = mount(GeolocationErrorModal, { stubs: { Modal: true } })
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().tryagain).toBeTruthy()
    })
  })
})
