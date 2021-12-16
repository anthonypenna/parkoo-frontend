import { MAPBOX_CENTER, MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapboxState } from '@/models/MapboxState'
import { state } from '@/store/mapbox/state'
import * as mapboxUtils from '@/utils/mapbox'

jest.mock('@/utils/mapbox')

describe('state', () => {
  beforeEach(() => {
    process.env.VUE_APP_MAPBOX_ACCESS_TOKEN = 'token'
    jest.spyOn(mapboxUtils, 'getInitialCenter').mockReturnValue(MAPBOX_CENTER)
  })

  afterEach(() => {
    delete process.env.VUE_APP_MAPBOX_TOKEN
    jest.clearAllMocks()
  })

  it('should return a default state', () => {
    expect(state()).toEqual<MapboxState>({
      accessToken: 'token',
      center: MAPBOX_CENTER,
      map: null,
      theme: MAPBOX_THEME,
      zoom: MAPBOX_ZOOM
    })
  })
})
