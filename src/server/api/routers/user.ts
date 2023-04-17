import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import type { Prisma } from '@prisma/client'

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
      const promises: Prisma.PrismaPromise<Prisma.JsonObject>[] = input.ids.map(
        (id) => {
          return ctx.prisma.$runCommandRaw({
            findAndModify: 'User',
            query: { _id: { $oid: id } },
            //$not doesn't work with "$value" in typescript because it tries to pass
            //the raw string "$value" into $not instead of the boolean value that
            //"$value" evaluates to. Using $cond seems to be the only workaround.
            update: [
              {
                $set: {
                  shouldEmail: {
                    $cond: { if: '$shouldEmail', then: false, else: true },
                  },
                },
              },
            ],
            new: true,
            upsert: true,
          })
        },
      )
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
