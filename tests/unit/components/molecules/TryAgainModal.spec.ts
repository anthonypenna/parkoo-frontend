import { mount } from '@vue/test-utils'
import TryAgainModal from '@/components/molecules/TryAgainModal.vue'
import Button from '@/components/atoms/Button.vue'

describe('<TryAgainModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(TryAgainModal, {
      slots: { default: 'Hello world!' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking on the try again button', () => {
    it('should emit a try again event', () => {
      const wrapper = mount(TryAgainModal)
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().tryagain).toBeTruthy()
    })
  })
})
