import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const investmentRouter = createTRPCRouter({
  getInvestmentsBySkipTake: publicProcedure
    .input(
      z.object({
        skip: z.number().min(0).nullish(),
        take: z.number().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const skip = input.skip ?? 0
      const take = input.take ?? 10

      const items = await ctx.prisma.investment.findMany({
        take: take,
        skip: skip,
      })

      const count = await ctx.prisma.investment.count()

      return {
        items,
        count,
      }
    }),
})
