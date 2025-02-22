import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import type { AggregatedTotalMarketVal } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const aggregationRouter = createTRPCRouter({
  aggregateTotalMarketValBySector: publicProcedure
    .input(
      z.object({
        year: z.number().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const aggregated = await ctx.prisma.investment.aggregateRaw({
        pipeline: [
          {
            $match: {
              year: input.year || { $exists: true },
            },
          },
          {
            $lookup: {
              from: 'Company',
              localField: 'companyId',
              foreignField: '_id',
              as: 'companyInfo',
            },
          },
          {
            $group: {
              _id: '$companyInfo.sector',
              totalMarketVal: { $sum: '$marketVal' },
            },
          },
          {
            $unwind: '$_id',
          },
          {
            $project: {
              _id: 0,
              sector: '$_id',
              totalMarketVal: 1,
            },
          },
          {
            $set: {
              year: input.year || null,
            },
          },
        ],
      })

      if (!aggregated) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error aggregating net asset value by sector',
        })
      }

      const createMany = await ctx.prisma.aggregatedTotalMarketVal.createMany({
        data: aggregated as unknown as AggregatedTotalMarketVal[],
      })

      if (!createMany) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error creating aggregated total market value by sector',
        })
      }
    }),
  getTotalMarketValBySector: publicProcedure
    .input(
      z.object({
        year: z.number().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const aggregated = await ctx.prisma.aggregatedTotalMarketVal.findMany({
        where: {
          year: input.year || null,
        },
        select: {
          sector: true,
          totalMarketVal: true,
        },
      })

      if (!aggregated) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error fetching aggregated total market value by sector',
        })
      }

      return aggregated
    }),
})
