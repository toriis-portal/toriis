import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { RequestStatus } from '@prisma/client'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const requestRouter = createTRPCRouter({
  getAllRequests: protectedProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.request.findMany({})
    return requests
  }),
  updateRequest: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        updateAction: z.enum(['approve', 'reject']),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.updateAction === 'reject') {
        const rejectedRequest = await ctx.prisma.request.update({
          where: {
            id: input.id,
          },
          data: {
            status: RequestStatus.REJECTED,
          },
        })
        if (!rejectedRequest) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to reject request',
          })
        }
      } else {
        // Go through updates to update the database

        const request = await ctx.prisma.request.findUnique({
          where: {
            id: input.id,
          },
        })

        if (!request) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Request not found',
          })
        }

        const allUpdateItems = request.updates
        const updateAll = await Promise.all(
          allUpdateItems.map(async (updateItem) => {
            console.log(updateItem)
            await ctx.prisma.company.update({
              where: {
                id: updateItem.id,
              },
              data: {
                updateItem, // TODO: fix this
              },
            })
          }),
        )

        if (!updateAll) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to update company',
          })
        }

        const approvedRequest = await ctx.prisma.request.update({
          where: {
            id: input.id,
          },
          data: {
            status: RequestStatus.APPROVED,
          },
        })

        if (!approvedRequest) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to approve request',
          })
        }
      }
    }),
})
