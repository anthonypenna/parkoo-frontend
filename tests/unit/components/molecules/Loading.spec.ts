import Loading from '@/components/molecules/Loading.vue'
import { shallowMount } from '@vue/test-utils'

describe('<Loading />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(Loading)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
