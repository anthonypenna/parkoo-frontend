import { USER_CURSOR_NAME } from '@/constants/user-cursor'
import { MapChild } from '@/models/MapChild'

export function isUserCursor(component: Vue): component is MapChild {
  return component.$options.name === USER_CURSOR_NAME
}
