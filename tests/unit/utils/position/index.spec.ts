import { convertPositionToLngLatLike } from '@/utils/position'

describe('convertPositionToLngLatLike', () => {
  it('should return a lng lat like tuple', () => {
    expect(convertPositionToLngLatLike({ lat: 45, lng: 9 })).toEqual([9, 45])
  })
})
