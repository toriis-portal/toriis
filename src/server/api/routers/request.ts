import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { Dataset, RequestStatus } from '@prisma/client'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import type { UpdateType, StrictUpdateType } from '../../../types'
import { datasetEnum } from '../../../utils/enums'

type UpdateQuery = Omit<UpdateType, 'maturityDate' | 'date'> & {
  maturityDate?: object
  date?: object
}

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
            const { id, ...updateKeyValuePair } = updateItem
            const { key, value } = updateKeyValuePair
            const updateQuery: { [key: string]: any } = { [key]: value }

            await ctx.prisma.$runCommandRaw({
              update: tableToUpdate,
              updates: [
                {
                  q: { _id: { $oid: id } },
                  u: { $set: updateQuery },
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
