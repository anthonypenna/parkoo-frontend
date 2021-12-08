import { DateState } from '@/models/DateState'
import { dateStore } from '@/store/date'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

jest.mock('@/services/streets')

const localVue = createLocalVue()

localVue.use(Vuex)

describe('date store', () => {
  const store = new Vuex.Store<{ date: DateState }>({
    modules: {
      date: { ...dateStore },
    },
  })

  const initialState = JSON.stringify(store.state)

  beforeEach(() => {
    store.replaceState(JSON.parse(initialState))
  })

  it('should have a default state', () => {
    expect(store.state.date).toEqual<DateState>({
      currentDay: new Date().getDay(),
    })
  })

  describe('getters', () => {
    describe('currentDay', () => {
      it('should return the current day', () => {
        const currentDay = store.getters['date/currentDay']
        expect(currentDay).toEqual(new Date().getDay())
      })
    })
  })
})
