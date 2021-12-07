import { getGeolocationPosition } from '@/services/geolocation'

describe('getGeolocationPosition', () => {
  Object.defineProperties(global, {
    GeolocationPositionError: {
      value: { PERMISSION_DENIED: 0 },
    },
    navigator: {
      value: { geolocation: { getCurrentPosition: jest.fn() } },
    },
  })

  Object.defineProperty(global.navigator, 'geolocation', {
    value: { getCurrentPosition: jest.fn() },
    writable: true,
  })

  describe('when geolocation fetching fails', () => {
    Object.defineProperty(global.navigator.geolocation, 'getCurrentPosition', {
      value: jest.fn((_, onError) =>
        onError({ code: GeolocationPositionError.PERMISSION_DENIED })
      ),
    })

    it('should reject with a geolocation position error', () => {
      getGeolocationPosition().catch(error => {
        expect(error).toEqual({
          code: GeolocationPositionError.PERMISSION_DENIED,
        })
      })
    })
  })

  describe('when geolocation fetching succeeds', () => {
    Object.defineProperty(global.navigator.geolocation, 'getCurrentPosition', {
      value: jest.fn(onSuccess =>
        onSuccess({ coords: { latitude: 24, longitude: 42 } })
      ),
    })

    it('should resolve with a geolocation position', () => {
      getGeolocationPosition().then(position => {
        expect(position).toEqual({ coords: { latitude: 24, longitude: 42 } })
      })
    })
  })
})
