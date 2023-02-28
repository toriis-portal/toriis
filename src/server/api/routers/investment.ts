import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const investmentRouter = createTRPCRouter({
  getInvestments: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 10
      const { cursor } = input
      const items = await ctx.prisma.investment.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
      })
      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem?.id
      }
      return {
        items,
        nextCursor,
      }
    }),
})
