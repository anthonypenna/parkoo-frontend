import { mount } from '@vue/test-utils'
import GeolocationErrorModal from '@/components/molecules/GeolocationErrorModal.vue'

describe('<GeolocationErrorModal />', () => {
  it('should render correctly', () => {
    const wrapper = mount(GeolocationErrorModal, { stubs: { Modal: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
