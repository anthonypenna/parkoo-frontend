import { CombinedVueInstance } from 'vue/types/vue'

export type MapChild<
  C = unknown,
  P = Readonly<{ lat: number; lng: number }>
> = CombinedVueInstance<Vue, unknown, unknown, C, P>
