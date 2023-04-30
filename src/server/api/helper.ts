import z from 'zod'

import { publicProcedure } from './trpc'

export const skipTakeRequest = publicProcedure
  .input(
    z.object({
      skip: z.number().min(0).max(100).nullish(),
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

    return {
      items,
    }
  })
