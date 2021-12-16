import { MapChild } from '@/models/MapChild'

export function isComponentWithName(componentName: string) {
  return (component: Vue): component is MapChild => component.$options.name === componentName
}
