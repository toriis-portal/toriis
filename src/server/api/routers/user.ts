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

    addWhitelistedUser: protectedProcedure
    .input(z.object({
      email: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const existingUser = await ctx.prisma.whitelistedUser.findUnique({
        where: {
          email: input.email,
        },
      });

      if (existingUser) {
        // User already exists in the whitelist
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User is already in the whitelist',
        });
      }

      await ctx.prisma.whitelistedUser.create({
        data: {
          email: input.email,
        },
      });

      return {
        success: true,
        message: 'User added to whitelist',
      };
    }),
})