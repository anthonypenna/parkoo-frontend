import { isComponentWithName } from '@/utils/component'
import Vue from 'vue'

describe('isComponentWithName', () => {
  describe('when the component is not the same', () => {
    it('should return false', () => {
      const Foo = { $options: { name: 'Foo ' } } as Vue
      expect(isComponentWithName('Bar')(Foo)).toEqual(false)
    })
  })

  describe('when the component is the same', () => {
    it('should return true', () => {
      const Foo = { $options: { name: 'Foo' } } as Vue
      expect(isComponentWithName('Foo')(Foo)).toEqual(true)
    })
  })
})
