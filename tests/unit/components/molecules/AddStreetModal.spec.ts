import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import AddStreetModal from '@/components/molecules/AddStreetModal.vue'
import PromptModal from '@/components/molecules/PromptModal.vue'
import Vuex from 'vuex'
import { RootState } from '@/models/RootState'
import { Street } from '@/models/Street'
import { Day } from '@/constants/date'

type AddStreetModalComponent = Wrapper<
  Vue & {
    cleaningDays: Array<{ id: Day; label: string; cleaned: boolean }>
  }
>

type PromptModalComponent = Wrapper<
  Vue & {
    onClose(): void
    onConfirm(): void
  }
>

const localVue = createLocalVue()

localVue.use(Vuex)

const store = new Vuex.Store<RootState>({
  getters: {
    nameOfStreetBeingAdded: jest.fn()
  },
  modules: {
    user: {
      namespaced: true,
      state: {
        lat: 0,
        lng: 0
      },
      getters: {
        lat: jest.fn(() => 0),
        lng: jest.fn(() => 0)
      }
    }
  }
})

describe('<AddStreetModal />', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(AddStreetModal, { localVue, store })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('when clicking on the cancel button', () => {
    it('should emit a cancel event', () => {
      const wrapper = mount(AddStreetModal, {
        localVue,
        store,
        stubs: { Modal: true }
      })

      const modal = wrapper.findComponent(PromptModal) as PromptModalComponent
      modal.vm.onClose()
      expect(wrapper.emitted().cancel).toBeTruthy()
    })
  })

  describe('when clicking on the add button', () => {
    it('should emit an add event', () => {
      const wrapper = mount(AddStreetModal, {
        localVue,
        store,
        stubs: { Modal: true }
      })

      const modal = wrapper.findComponent(PromptModal) as PromptModalComponent
      modal.vm.onConfirm()
      expect(wrapper.emitted().add).toBeTruthy()
    })

    it('should emit the correct payload', () => {
      const wrapper = mount(AddStreetModal, {
        localVue,
        store,
        stubs: { Modal: true }
      }) as AddStreetModalComponent

      wrapper.vm.cleaningDays[0].cleaned = true

      const modal = wrapper.findComponent(PromptModal) as PromptModalComponent
      modal.vm.onConfirm()

      const addEvents = wrapper.emitted().add as unknown[][]
      expect(addEvents[0][0]).toEqual<Street>({
        cleaningDays: {
          0: false,
          1: true,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false
        },
        id: '',
        lat: 0,
        lng: 0
      })
    })
  })
})
