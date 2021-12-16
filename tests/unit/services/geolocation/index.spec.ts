import { LAST_KNOWN_POSITION_KEY } from '@/constants/local-storage'
import { Position } from '@/models/Position'
import { getGeolocationPosition, getLastKnownPosition, saveLastKnownPosition } from '@/services/geolocation'

describe('getGeolocationPosition', () => {
  Object.defineProperties(global, {
    GeolocationPositionError: {
      value: { PERMISSION_DENIED: 0 }
    },
    navigator: {
      value: { geolocation: { getCurrentPosition: jest.fn() } }
    }
  })

  Object.defineProperty(global.navigator, 'geolocation', {
    value: { getCurrentPosition: jest.fn() },
    writable: true
  })

  describe('when geolocation fetching fails', () => {
    Object.defineProperty(global.navigator.geolocation, 'getCurrentPosition', {
      value: jest.fn((_, onError) => onError({ code: GeolocationPositionError.PERMISSION_DENIED }))
    })

    it('should reject with a geolocation position error', () => {
      getGeolocationPosition().catch(error => {
        expect(error).toEqual({
          code: GeolocationPositionError.PERMISSION_DENIED
        })
      })
    })
  })

  describe('when geolocation fetching succeeds', () => {
    Object.defineProperty(global.navigator.geolocation, 'getCurrentPosition', {
      value: jest.fn(onSuccess => onSuccess({ coords: { latitude: 24, longitude: 42 } }))
    })

    it('should resolve with a geolocation position', () => {
      getGeolocationPosition().then(position => {
        expect(position).toEqual({ coords: { latitude: 24, longitude: 42 } })
      })
    })
  })
})

describe('saveLastKnownPosition', () => {
  Object.defineProperty(global, 'localStorage', {
    value: { setItem: jest.fn(), getItem: jest.fn() },
    writable: true
  })

  it('should save the latest user coordinates to local storage', () => {
    const setItem = jest.spyOn(global.localStorage, 'setItem')
    saveLastKnownPosition({ lat: 45, lng: 9 })
    expect(setItem).toHaveBeenCalledWith(LAST_KNOWN_POSITION_KEY, JSON.stringify({ lat: 45, lng: 9 }))
  })
})

describe('getLastKnownPosition', () => {
  Object.defineProperty(global, 'localStorage', {
    value: { setItem: jest.fn(), getItem: jest.fn() },
    writable: true
  })

  describe('when there is no latest known position', () => {
    const mockLocalStorage: Record<string, string> = {}

    it('should return null', () => {
      jest.spyOn(global.localStorage, 'getItem').mockImplementation((key: string) => mockLocalStorage[key] || null)
      const position = getLastKnownPosition()
      expect(position).toBeNull()
    })
  })

  describe('when there is a latest known position', () => {
    const mockLocalStorage: Record<string, string> = {
      [LAST_KNOWN_POSITION_KEY]: '{"lat":45,"lng":9}'
    }

    it('should be returned', () => {
      jest.spyOn(global.localStorage, 'getItem').mockImplementation((key: string) => mockLocalStorage[key] || null)
      const position = getLastKnownPosition()
      expect(position).toEqual<Position>({ lat: 45, lng: 9 })
    })
  })
})
