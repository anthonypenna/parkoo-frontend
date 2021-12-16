import { LngLatLike } from 'mapbox-gl'

export const MAPBOX_ACCESS_TOKEN = process.env.VUE_APP_MAPBOX_TOKEN || ''
export const MAPBOX_CENTER = [0, 0] as LngLatLike
export const MAPBOX_THEME = 'mapbox://styles/anthonypenna/ckwt4kriz2ivh15nvz54lzhz3?optimize=true'
export const MAPBOX_ZOOM = 17
export const MAPBOX_FLY_SPEED = 6
