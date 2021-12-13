import { areEqual } from '@/utils/array'

describe('areEqual', () => {
  describe('when the arrays arent equal', () => {
    it('should return false', () => {
      expect(areEqual([1, 2], [2, 3])).toEqual(false)
    })
  })

  describe('when the arrays are equal', () => {
    it('should return true', () => {
      expect(areEqual([1, 2], [1, 2])).toEqual(true)
    })
  })
})
