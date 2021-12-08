import { Street } from '@/models/Street'
import { rest } from 'msw'

const streets: Street[] = [
  {
    cleaningDays: { 4: true },
    id: '0',
    lat: 42.70709379373314,
    lng: 13.827044692181971,
  },
  {
    cleaningDays: { 5: true },
    id: '1',
    lat: 42.707372673103315,
    lng: 13.826824145343545,
  },
]

export const handlers = [
  rest.get('/api/v1/streets', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ streets }))
  }),
]
