import { Street } from '@/models/Street'
import { rest } from 'msw'

const streets: Street[] = []

export const handlers = [
  rest.get('/api/v1/streets', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ streets }))
  }),
]
