import { reverseGeocode } from '@/services/geocoding'
import { until } from '@/utils/async'

describe('reverseGeocode', () => {
  describe('when the request fails', () => {
    it('should throw', async () => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockRejectedValue({ message: 'Error!' }),
        writable: true
      })

      const [error] = await until(() => reverseGeocode(0, 0, ''))
      expect(error).toEqual({ message: 'Error!' })
    })
  })

  describe('when the request succeeds', () => {
    it('should return the correct response', async () => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            features: [{ text: 'Hello!' }]
          })
        }),
        writable: true
      })

      const [_, response] = await until(() => reverseGeocode(0, 0, ''))
      expect(response).toEqual({ features: [{ text: 'Hello!' }] })
    })
  })
})
