import { mount } from '@vue/test-utils'
import StreetsFetchingErrorModal from '@/components/molecules/StreetsFetchingErrorModal.vue'
import Button from '@/components/atoms/Button.vue'

describe('<StreetsFetchingErrorModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(StreetsFetchingErrorModal)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking the try again button', () => {
    it('should emit a try again event', () => {
      const wrapper = mount(StreetsFetchingErrorModal)
      wrapper.findComponent(Button).trigger('click')
      expect(wrapper.emitted().tryagain).toBeTruthy()
    })
  })
})
