import { EnvGrade, Sector } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import type { Company, Investment } from '@prisma/client'
import yahooFinance from 'yahoo-finance2'
import type { ContentfulCollection } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'

import { sectorEnum } from '../../../utils/enums'
import { ContentWrapper } from '../../../utils/content'
import { createTRPCRouter, publicProcedure } from '../trpc'
import type { IndustryEntry, SectorEntry } from '../../../types'

const createNetAssetValFilter = (range: number[]) => {
  return {
    netAssetVal: {
      gte: range[0],
      lte: range[1],
    },
  }
}

interface SortOrder {
  netAssetVal?: 'asc' | 'desc'
  ESG?: {
    environmentGrade?: 'asc' | 'desc'
  }
}

type SortByString = 'asc' | 'desc'

const sortStringZodType = z
  .union([z.literal('asc'), z.literal('desc')])
  .nullish()

const createSortOrder = (
  sortByNetAssetVal?: SortByString | null,
  sortByEnvGrade?: SortByString | null,
): SortOrder[] | SortOrder | { name: SortByString } => {
  if (sortByNetAssetVal && sortByEnvGrade) {
    return [
      {
        netAssetVal: sortByNetAssetVal,
      },
      {
        ESG: {
          environmentGrade: sortByEnvGrade,
        },
      },
    ]
  } else if (sortByNetAssetVal) {
    return {
      netAssetVal: sortByNetAssetVal,
    }
  } else if (sortByEnvGrade) {
    return {
      ESG: {
        environmentGrade: sortByEnvGrade,
      },
    }
  } else {
    return {}
  }
}

export const companyRouter = createTRPCRouter({
  getCompanyFinanceData: publicProcedure
    .input(
      z.object({ id: z.string(), options: z.object({ period1: z.string() }) }),
    )
    .query(async ({ ctx, input }) => {
      const options = input.options

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

      const companyTicker: string | null = company.ticker

      if (!companyTicker) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'No Ticker Found',
        })
      }

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
        include: {
          energy: true,
        },
      })
      if (!company || !company.sector) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Company not found',
        })
      }

      const contentClient = new ContentWrapper()

      const industryEntries: ContentfulCollection<IndustryEntry> =
        await contentClient.get('industry')
      let industryEntry: IndustryEntry | { name: string; details: string } = {
        name: 'NA',
        details: 'NA',
      }

      const foundItem = industryEntries.items.find((item: IndustryEntry) => {
        if ('fields' in item) {
          return item.fields?.name === company.industry
        }
        return false
      })

      if (foundItem) {
        industryEntry = foundItem.fields as IndustryEntry
      }

      const sectorName = sectorEnum[company.sector] as Sector
      let sectorEntry: SectorEntry = {
        name: '',
        details: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [],
        },
        fields: {
          name: '',
          details: {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [],
          },
        },
      }

      const sectorEntries: ContentfulCollection<SectorEntry> =
        await contentClient.get('sector')
      const foundEntry = sectorEntries.items.find((item: SectorEntry) => {
        return item.fields?.name === sectorName
      })
      if (foundEntry && foundEntry.fields) {
        sectorEntry = foundEntry.fields
      }

      return { company, sectorEntry, industryEntry }
    }),

  getCompanies: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        sortByEnvGrade: sortStringZodType,
        sortByNetAssetVal: sortStringZodType,
        filterBySector: z.array(z.nativeEnum(Sector)).nullish(),
        filterByIndustry: z.array(z.string()).nullish(),
        filterByEnvGrade: z.array(z.nativeEnum(EnvGrade)).nullish(),
        filterByNetAssetVal: z.array(z.array(z.number(), z.number())).nullish(),
        searchByCompanyName: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 10
      const { cursor } = input

      const netAssetValFilter = input.filterByNetAssetVal?.map((range) =>
        createNetAssetValFilter(range),
      )

      const netAssetValFilterCleaned =
        netAssetValFilter && netAssetValFilter.length > 0
          ? netAssetValFilter
          : undefined

      const filterByEnvGradeCleaned =
        input.filterByEnvGrade && input.filterByEnvGrade.length > 0
          ? input.filterByEnvGrade
          : undefined

      const items = await ctx.prisma.company.findMany({
        where: {
          name: {
            contains: input.searchByCompanyName,
            mode: 'insensitive',
          },
          sector: {
            in: input.filterBySector,
          },
          industry: {
            in: input.filterByIndustry,
          },
          ...(input.filterByEnvGrade || input.sortByEnvGrade
            ? {
                ESG: {
                  environmentGrade: {
                    in: filterByEnvGradeCleaned,
                  },
                },
              }
            : {}),
          OR: netAssetValFilterCleaned,
        },
        include: {
          ESG: {
            select: {
              environmentGrade: true,
            },
          },
        },
        orderBy: createSortOrder(input.sortByNetAssetVal, input.sortByEnvGrade),
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

  getNetAssetValBySector: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.groupBy({
      by: ['sector'],
      _sum: {
        netAssetVal: true,
      },
    })
  }),

  getInvestmentByCompany: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        companyId: z.string(),
        sortKey: z.string().nullish(),
        sortOrder: z.string().nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 5
      const companyId = input.companyId ?? ''
      const sortKey = (input.sortKey ?? undefined) as keyof Investment | null
      const sortOrder = input.sortOrder ?? undefined
      const cursor = input.cursor

      const items = await ctx.prisma.investment.findMany({
        orderBy: {
          ...(sortKey ? { [sortKey]: sortOrder } : {}),
        },
        where: {
          companyId: companyId,
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
})
