import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { type Company, Dataset, RequestStatus, Sector } from '@prisma/client'
import type { JSONObject } from 'superjson/dist/types'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import type { StrictUpdateType } from '../../../types'
import { IndustryEnum, datasetEnum } from '../../../utils/enums'

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
            key: z.string(),
            value: z
              .string()
              .or(z.number())
              .or(z.date())
              .or(z.nativeEnum(Sector))
              .or(z.nativeEnum(IndustryEnum)), // TODO: Check this again so and see if there's a way we can have more narrow types on this
            page: z.number().nullish(),
          }),
        ),
        status: z.nativeEnum(RequestStatus),
        comment: z.string().nullish(),
        userId: z.string(),
        createdAt: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
        const allUpdateItems = request.updates as StrictUpdateType[]

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

  getRequestDataDiff: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const request = await ctx.prisma.request.findUnique({
        where: {
          id: input.id,
        },
      })
      if (!request) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Error fetching request',
        })
      }
      const targetDataset = datasetEnum[request.dataset]
      const targetItems = request.updates.map((update) => update.id)

      const originalData = await ctx.prisma.$runCommandRaw({
        find: targetDataset,
        filter: {
          _id: { $in: targetItems.map((id) => ({ $oid: id })) },
        },
      })

      if (originalData && originalData.cursor) {
        const parsedOriginalData = (
          (originalData.cursor as JSONObject).firstBatch as JSONObject[]
        ).map((item) => {
          item.id = (item._id as JSONObject)?.$oid as string
          return item
        }) as Company[]

        return {
          request: request,
          old: parsedOriginalData,
          new: request.updates as StrictUpdateType[],
        }
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error fetching original data',
        })
      }
    }),
})
