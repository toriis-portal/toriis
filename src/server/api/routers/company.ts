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

const createNetAssetSumFilter = (range: number[]) => {
  return {
    netAssetVal: {
      gte: range[0],
      lte: range[1],
    },
  }
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
        sortByNetAssetVal: z.string().nullish(),
        filterBySector: z.array(z.nativeEnum(Sector)).nullish(),
        filterByIndustry: z.array(z.string()).nullish(),
        filterByEnvGrade: z.array(z.nativeEnum(EnvGrade)).nullish(),
        filterByNetAssetVal: z.array(z.array(z.number(), z.number())).nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 9
      const { cursor } = input

      const netAssetValFilter = input.filterByNetAssetVal?.map((range) =>
        createNetAssetSumFilter(range),
      )

      const netAssetValFilterCleaned =
        netAssetValFilter && netAssetValFilter.length > 0
          ? netAssetValFilter
          : undefined

      const items = await ctx.prisma.company.findMany({
        where: {
          sector: {
            in: input.filterBySector,
          },
          industry: {
            in: input.filterByIndustry,
          },
          OR: netAssetValFilterCleaned,
          ESG: {
            environmentGrade: {
              in: input.filterByEnvGrade ? input.filterByEnvGrade : undefined,
            },
          },
        },
        orderBy: {
          netAssetVal: extractSortOrder(input.sortByNetAssetVal)
            ? input.sortByNetAssetVal
            : undefined,
          ESG: {
            environmentGrade: extractSortOrder(input.sortByEnvGrade)
              ? input.sortByEnvGrade
              : undefined,
          },
        },
        include: {
          ESG: {
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
  sumBySector: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.groupBy({
      by: ['sector'],
      _sum: {
        netAssetVal: true,
      },
    })
  }),
})
