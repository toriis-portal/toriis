import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const companyRouter = createTRPCRouter({
  getInvestments: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 10
      const { cursor } = input

      const items = await ctx.prisma.company.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          name: true,
          sector: true,
          industry: true,
          investment: {
            select: {
              marketVal: true,
              quantity: true,
            },
          },
          ESG: {
            select: {
              environment_grade: true,
            },
          },
        },
      })

      items.forEach((item) => {
        let asset_sum = 0
        item.investment.forEach((iv) => {
          asset_sum += iv.marketVal * iv.quantity
        })
        Object.assign(item, { asset_sum: asset_sum })
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
