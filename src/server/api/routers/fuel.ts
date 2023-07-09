import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const fuelRouter = createTRPCRouter({
  getFuelsBySkipTake: publicProcedure
    .input(
      z.object({
        skip: z.number().min(0).nullish(),
        take: z.number().min(1).max(100).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const skip = input.skip ?? 0
      const take = input.take ?? 10

      const items = await ctx.prisma.fuel.findMany({
        take: take,
        skip: skip,
      })

      const count = await ctx.prisma.fuel.count()

      return {
        items,
        count,
      }
    }),
})
