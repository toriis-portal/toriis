import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import type { Company } from '@prisma/client'
import yahooFinance from 'yahoo-finance2'

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
  // given a company id, find company in db
  // then grab ticker,
  // then query yahoo-finance with ticker
  getCompanyFinanceData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // given a company id, find company in db
      const options = {
        period1: '2022-02-01',
      }

      const company: Company | null = await ctx.prisma.company.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!company) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Error fetching company',
        })
      }

      // given the company, grab the ticker as query value
      const companyTicker: string | null = company.ticker

      if (!companyTicker) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No Ticker Found',
        })
      }

      // given the company ticker, query yahoo finance
      const companyFinanceData = yahooFinance.historical(companyTicker, options)

      return companyFinanceData
    }),

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
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 9
      const { cursor } = input

      const items = await ctx.prisma.company.findMany({
        orderBy: {
          netAssetVal: extractSortOrder(input.sortByNetAssetVal)
            ? input.sortByNetAssetVal
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
