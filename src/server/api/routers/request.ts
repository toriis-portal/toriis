import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { RequestStatus } from '@prisma/client'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import type { UpdateType } from '../../../types'
import { datasetEnum } from '../../../utils/enums'

type UpdateQuery = Omit<UpdateType, 'maturityDate' | 'date'> & {
  maturityDate?: object
  date?: object
}

export const requestRouter = createTRPCRouter({
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
          message: 'This request is already approved or rejected',
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
        return 'Successfully rejected request'
      }

      // Approve the request and update corresponding entries
      if (input.updateAction === 'approve') {
        const tableToUpdate = datasetEnum[request.dataset]
        const allUpdateItems = request.updates

        const updateAll = await Promise.all(
          allUpdateItems.map(async (updateItem) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...fieldsToUpdate } = updateItem

            // Cast Date to object for MongoDB query
            const fieldsToUpdateQuery: UpdateQuery = {
              ...fieldsToUpdate,
              maturityDate: fieldsToUpdate.maturityDate,
              date: fieldsToUpdate.date ? fieldsToUpdate.date : undefined,
            }

            await ctx.prisma.$runCommandRaw({
              update: tableToUpdate,
              updates: [
                {
                  q: { _id: { $oid: updateItem.id } },
                  u: { $set: fieldsToUpdateQuery },
                },
              ],
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

        return 'Successfully approved request'
      }
    }),
})
