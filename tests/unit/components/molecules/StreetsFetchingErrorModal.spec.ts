import { mount } from '@vue/test-utils'
import StreetsFetchingErrorModal from '@/components/molecules/StreetsFetchingErrorModal.vue'

describe('<StreetsFetchingErrorModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(StreetsFetchingErrorModal, { stubs: { Modal: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
