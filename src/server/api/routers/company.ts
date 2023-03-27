import { EnvGrade, Sector } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

const extractSortOrder = (
  sort: string | undefined | null,
): sort is 'asc' | 'desc' | undefined => {
  if (sort === undefined || sort === 'asc' || sort === 'desc') {
    return true
  }

  return false
}

export const companyRouter = createTRPCRouter({
  getCompany: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const company = await ctx.prisma.company.findUnique({
        where: {
          id: input.id,
        },
      })
      if (!company) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Company not found',
        })
      }
      return company
    }),
  getCompanies: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        sortByEnvGrade: z.string().nullish(),
        sortByNetAssestSum: z.string().nullish(),
        filterBySector: z.array(z.nativeEnum(Sector)).nullish(),
        filterByIndustry: z.array(z.string()).nullish(),
        filterByEnvGrade: z.array(z.nativeEnum(EnvGrade)).nullish(),
        filterByNetAssetSum: z.array(z.array(z.number(), z.number())).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 9
      const { cursor } = input

      const netAssetSumFilter = input.filterByNetAssetSum?.map((range) => {
        return {
          netAssetSum: {
            gte: range[0],
            lte: range[1],
          },
        }
      })

      const netAssetSumFilterCleaned =
        netAssetSumFilter && netAssetSumFilter.length > 0
          ? netAssetSumFilter
          : undefined

      const items = await ctx.prisma.company.findMany({
        where: {
          sector: {
            in: input.filterBySector,
          },
          industry: {
            in: input.filterByIndustry,
          },
          OR: netAssetSumFilterCleaned,
          ESG: {
            some: {
              environmentGrade: {
                in: input.filterByEnvGrade ? input.filterByEnvGrade : undefined,
              },
            },
          },
        },
        orderBy: {
          netAssetSum: extractSortOrder(input.sortByNetAssestSum)
            ? input.sortByNetAssestSum
            : undefined,
        },
        include: {
          ESG: {
            orderBy: {
              environmentGrade: extractSortOrder(input.sortByEnvGrade)
                ? input.sortByEnvGrade
                : undefined,
            },
            select: {
              environmentGrade: true,
            },
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
  countBySector: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.groupBy({
      by: ['sector'],
      _count: {
        sector: true,
      },
    })
  }),
})
