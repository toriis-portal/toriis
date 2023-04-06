import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  firstLogin: protectedProcedure
    .input(z.object({ email: z.string(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const updatedWhiteList = await ctx.prisma.whitelistedUser.update({
        where: {
          email: input.email,
        },
        data: {
          userId: input.userId,
        },
      })
      if (!updatedWhiteList) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to connect user to whitelist',
        })
      }
    }),
  deleteManyUsers: protectedProcedure // TODO: check
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const deleteUsers = await ctx.prisma.user.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      })
      if (!deleteUsers) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete users',
        })
      }
    }),
})
