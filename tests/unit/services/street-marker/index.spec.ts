import { STREET_MARKER_NAME } from '@/constants/street-marker'
import { isStreetMarker } from '@/services/street-marker'

describe('isStreetMarker', () => {
  describe('when the component is not the StreetMarker component', () => {
    it('should return false', () => {
      const component = { $options: { name: 'Foo' } } as Vue
      expect(isStreetMarker(component)).toEqual(false)
    })
  })

  describe('when the component is the StreetMarker component', () => {
    it('should return true', () => {
      const component = { $options: { name: STREET_MARKER_NAME } } as Vue
      expect(isStreetMarker(component)).toEqual(true)
    })
  })
})
