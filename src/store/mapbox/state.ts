import { MAPBOX_THEME, MAPBOX_ZOOM } from '@/constants/mapbox'
import { MapboxState } from '@/models/MapboxState'
import { getInitialCenter } from '@/utils/mapbox'

export const state = (): MapboxState => ({
  accessToken: process.env.VUE_APP_MAPBOX_TOKEN || '',
  center: getInitialCenter(),
  map: null,
  theme: MAPBOX_THEME,
  zoom: MAPBOX_ZOOM
})
