import { until } from '@/utils/async'

describe('until', () => {
  describe('when the promise rejects', () => {
    it('should return a tuple with the error and null', async () => {
      const [error, result] = await until(() => Promise.reject(Error('Oops!')))
      expect(error).toEqual(Error('Oops!'))
      expect(result).toBeNull()
    })
  })

  describe('when the promise resolves', () => {
    it('should return a tuple with null and the result', async () => {
      const [error, result] = await until(() => Promise.resolve('Hello world!'))
      expect(error).toBeNull()
      expect(result).toEqual('Hello world!')
    })
  })
})
