import { Prisma } from '@prisma/client'
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

      const xprisma = ctx.prisma.$extends({
        result: {
          investment: {
            total_cost: {
              // the dependencies
              needs: { quantity: true, costVal: true },
              compute(investment) {
                // the computation logic
                return investment.quantity * investment.costVal
              },
            },
          },
        },
      })

      //temporary, can't get all the needed data
      const items = await ctx.prisma.company.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          name: true,
          sector: true,
          industry: true,
        },
      })

      /*const items = await xprisma.company.aggregateRaw({
        pipeline: [
          { $limit: limit },
          { $skip: 1 },
          { $addFields: { asset_sum: { $sum: "$investment.total_cost" }}},
          { $project: { _id: 1, name: 1, sector: 1, industry: 1, asset_sum: 1}}
        ]
    })*/

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length && items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem?.id
      }
      return {
        items,
        nextCursor,
      }
    }),
})
