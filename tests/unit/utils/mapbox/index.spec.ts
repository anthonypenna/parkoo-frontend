import { LAST_KNOWN_POSITION_KEY } from '@/constants/local-storage'
import { MAPBOX_CENTER } from '@/constants/mapbox'
import { getInitialCenter } from '@/utils/mapbox'

describe('getInitialCenter', () => {
  Object.defineProperty(global, 'localStorage', {
    value: { getItem: jest.fn() }
  })

  describe('when there is no last known position', () => {
    const mockLocalStorage: Record<string, string> = {}

    it('should return the default center', () => {
      jest.spyOn(global.localStorage, 'getItem').mockImplementation((key: string) => mockLocalStorage[key] || null)
      expect(getInitialCenter()).toEqual(MAPBOX_CENTER)
    })
  })

  describe('when there is a last known position', () => {
    const mockLocalStorage: Record<string, string> = {
      [LAST_KNOWN_POSITION_KEY]: '{"lat":45,"lng":9}'
    }

    it('should be returned as a tuple', () => {
      jest.spyOn(global.localStorage, 'getItem').mockImplementation((key: string) => mockLocalStorage[key] || null)
      expect(getInitialCenter()).toEqual([9, 45])
    })
  })
})
