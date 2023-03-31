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
  // getTicker: publicProcedure.input(z.string()).query(({ ctx, input }) => {
  //   return getCompanyTicker({ prisma: ctx.prisma, input })
  // }),
  // given a company id, find company in db
  // then grab ticker,
  // then query yahoo-finance with ticker
  getCompanyData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      // given a company id, find company in db
      console.log('INPUT: ' + input.id)
      const company: Company | null = await ctx.prisma.company.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!company) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Error fetching company',
        })
      }

      // given the company, grab the ticker as query value
      const query: string = company.ticker

      if (query === 'NO_TICKER_FOUND') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No Ticker Found',
        })
      }
      const options = {
        period1: '2022-02-01',
      }

      // initialize data array
      // let companyData: DateClosePair[]

      // initialize temp result from yahoo finance
      // pkg returns type HistoricalResult so we
      // will parse it into a JSON object then cast it to DateClosePair[]
      // let res: string

      // given the company ticker, query yahoo finance
      const ret = yahooFinance.historical(query, options)

      return ret

      // .then((ret) => {
      //   // while (ret == undefined) {
      //   //   if (ret != undefined) {
      //   //     return ret
      //   //   }
      //   // }
      //   console.log(ret)
      //   return ret
      //   // res = JSON.stringify(ret)
      //   // return res
      //   // companyData = JSON.parse(res) as DateClosePair[]
      //   // return companyData
      // })
      // .catch((error: unknown) => {
      //   // if invalid, populate data with an error message and leave valid = false
      //   return error
      // })
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
