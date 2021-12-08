import { getStreets } from '@/services/streets'
import { until } from '@/utils/async'

describe('getStreets', () => {
  describe('when the request fails', () => {
    Object.defineProperty(global, 'fetch', {
      value: jest.fn().mockRejectedValue({}),
      writable: true,
    })

    it('should reject with an error', () => {
      getStreets().catch(error => {
        expect(error).toEqual({})
      })
    })
  })

  describe('when the request succeeds', () => {
    Object.defineProperty(global, 'fetch', {
      value: jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          streets: [],
        }),
      }),
      writable: true,
    })

    it('should send the correct response', async () => {
      const [_, response] = await until(getStreets)
      expect(response).toEqual({ streets: [] })
    })
  })
})
