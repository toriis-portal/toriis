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
  deleteManyUsers: protectedProcedure
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
  updateUserEmailPreference: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const promises = input.ids.map(async (_id) => {
        const currentEmailVal = await ctx.prisma.user.findUnique({
          where: {
            id: _id,
          },
          select: {
            shouldEmail: true,
          },
        })

        if (!currentEmailVal) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Failed to retrieve current user email value (id: ${_id})`,
          })
        }

        return ctx.prisma.user.update({
          where: {
            id: _id,
          },
          data: {
            shouldEmail: !currentEmailVal.shouldEmail,
          },
        })
      })
      const updateEmailUsers = await Promise.all(promises)
      if (!updateEmailUsers) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update user emails',
        })
      }
      return updateEmailUsers
    }),
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany()
    return users
  }),
})
