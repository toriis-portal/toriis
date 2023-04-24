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
      // Check if the request is not already approved or rejected
      const request = await ctx.prisma.request.findUnique({
        where: {
          id: input.id,
        },
      })
      if (!request || request.status !== RequestStatus.PENDING) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This request cannot be rejected',
        })
      }
      // Reject the request
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
        // Approve the request and update corresponding entries
        const allUpdateItems = request.updates
        const updateAll = await Promise.all(
          allUpdateItems.map(async (updateItem) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...updateItemWithoutId } = updateItem
            await ctx.prisma.company.update({
              where: {
                id: updateItem.id,
              },
              data: updateItemWithoutId,
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
