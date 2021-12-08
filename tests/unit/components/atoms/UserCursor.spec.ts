import { shallowMount } from '@vue/test-utils'
import UserCursor from '@/components/atoms/UserCursor.vue'

describe('<UserCursor />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(UserCursor)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
