import { Dataset, RequestStatus } from '@prisma/client'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const requestRouter = createTRPCRouter({
  getAllRequests: protectedProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.request.findMany({})
    return requests
  }),
  createRequest: protectedProcedure
    .input(
      z.object({
        dataset: z.nativeEnum(Dataset),
        updates: z.array(
          z.object({
            id: z.string(),
            value: z.union([z.string(), z.number()]),
          }),
        ),
        status: z.nativeEnum(RequestStatus),
        comment: z.string().nullish(),
        userId: z.string(),
        createdAt: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const request = await ctx.prisma.request.create({
        data: {
          dataset: input.dataset,
          updates: input.updates,
          status: input.status,
          comment: input.comment,
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      })
      return request
    }),
})
