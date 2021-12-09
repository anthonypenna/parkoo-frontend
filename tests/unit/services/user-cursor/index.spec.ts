import { USER_CURSOR_NAME } from '@/constants/user-cursor'
import { isUserCursor } from '@/services/user-cursor'

describe('isUserCursor', () => {
  describe('when the component is not the UserCursor component', () => {
    it('should return false', () => {
      const component = { $options: { name: 'Foo' } } as Vue
      expect(isUserCursor(component)).toEqual(false)
    })
  })

  describe('when the component is the UserCursor component', () => {
    it('should return true', () => {
      const component = { $options: { name: USER_CURSOR_NAME } } as Vue
      expect(isUserCursor(component)).toEqual(true)
    })
  })
})
