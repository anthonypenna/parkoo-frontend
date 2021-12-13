import { mount } from '@vue/test-utils'
import StreetsFetchingErrorModal from '@/components/molecules/StreetsFetchingErrorModal.vue'
import Button from '@/components/atoms/Button.vue'
import Modal from '@/components/atoms/Modal.vue'

describe('<StreetsFetchingErrorModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(StreetsFetchingErrorModal, { stubs: { Modal: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking the try again button', () => {
    it('should emit a try again event', () => {
      const wrapper = mount(StreetsFetchingErrorModal, {
        stubs: { Modal: true },
      })
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().tryagain).toBeTruthy()
    })
  })
})
