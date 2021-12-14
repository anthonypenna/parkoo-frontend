import { Street } from '@/models/Street'
import { createStreet, getStreets } from '@/services/streets'
import { until } from '@/utils/async'

describe('getStreets', () => {
  describe('when the request fails', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockRejectedValue({}),
        writable: true,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should reject with an error', () => {
      getStreets().catch(error => {
        expect(error).toEqual({})
      })
    })
  })

  describe('when the request succeeds', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            streets: [],
          }),
        }),
        writable: true,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should send the correct response', async () => {
      const [_, response] = await until(getStreets)
      expect(response).toEqual({ streets: [] })
    })
  })
})

describe('createStreet', () => {
  describe('when the request fails', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockRejectedValue({}),
        writable: true,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should reject with an error', () => {
      const street: Street = {
        cleaningDays: {
          '0': false,
          '1': false,
          '2': false,
          '3': false,
          '4': false,
          '5': false,
          '6': false,
        },
        id: 'address.239847293847',
        lat: 45,
        lng: 9,
      }

      createStreet(street).catch(error => {
        expect(error).toEqual({})
      })
    })
  })

  describe('when the request succeeds', () => {
    beforeEach(() => {
      Object.defineProperty(global, 'fetch', {
        value: jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            street: {
              cleaningDays: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false,
                '5': false,
                '6': false,
              },
              id: 'address.239847293847',
              lat: 45,
              lng: 9,
            },
          }),
        }),
        writable: true,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should send the correct response', async () => {
      const [_, response] = await until(getStreets)
      expect(response).toEqual({
        street: {
          cleaningDays: {
            '0': false,
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
            '6': false,
          },
          id: 'address.239847293847',
          lat: 45,
          lng: 9,
        },
      })
    })
  })
})
