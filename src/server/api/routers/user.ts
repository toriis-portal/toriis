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
      const deleteWhitelist = await ctx.prisma.whitelistedUser.deleteMany({
        where: {
          userId: {
            in: input.ids,
          },
        },
      })
      if (!deleteWhitelist) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete user from whitelist',
        })
      }
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

  deleteManyWhitelistedUsers: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const deleteWhitelist = await ctx.prisma.whitelistedUser.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      })
      if (!deleteWhitelist) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete user from whitelist',
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
    const users = await ctx.prisma.whitelistedUser.findMany()

    const fullUsers = users.map(async (wuser) => {
      if (!wuser.userId) {
        return wuser
      }

      const fullUser = await ctx.prisma.user.findUnique({
        where: {
          id: wuser.userId,
        },
      })

      return fullUser || wuser
    })

    const promises = await Promise.all(fullUsers)
    if (!promises) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to get user data',
      })
    }
    return promises
  }),

  findUserById: protectedProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ input, ctx }) => {
      if (!input.id) {
        return undefined
      }
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      })
    }),

  addWhitelistedUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.prisma.whitelistedUser.findUnique({
        where: {
          email: input.email,
        },
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User is already in the whitelist',
        })
      }

      await ctx.prisma.whitelistedUser.create({
        data: {
          email: input.email,
        },
      })

      return {
        success: true,
        message: 'User added to whitelist',
      }
    }),
})
