import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const requestRouter = createTRPCRouter({
  getAllRequests: protectedProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.request.findMany({})
    return requests
  }),
  getRequests: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        userId: z.string(),
        showOnlyUserRequests: z.boolean().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 15
      const { cursor } = input

      const items = await ctx.prisma.request.findMany({
        where: {
          user: {
            ...(input.showOnlyUserRequests
              ? {
                  is: {
                    id: input.userId,
                  },
                }
              : {
                  isNot: {
                    id: input.userId,
                  },
                }),
          },
        },
        take: limit + 1,
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
