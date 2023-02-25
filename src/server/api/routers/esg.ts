import type { ESG, Company, ESGIndex } from '@prisma/client'
import { z } from 'zod'

import type { Context } from '../trpc'
import { createTRPCRouter, publicProcedure } from '../trpc'

interface companyIndexType {
  id: string
  companyId: string
}
const MAX_API_CALLS = 3
const consumeExternalApi = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { method: 'GET' })
  return (await res.json()) as T
}

const updateESGIndex = async (
  ctx: Context,
  companyIndex: companyIndexType,
  company: Company,
): Promise<ESGIndex> => {
  return await ctx.prisma.eSGIndex.update({
    where: {
      id: companyIndex?.id ?? '1',
    },
    data: {
      companyId: company?.id ?? '1',
    },
  })
}

export const esg = createTRPCRouter({
  esgpull: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    if (input !== process.env.CRONJOB_KEY) {
      return 'Not Authorized'
    }

    let companyIndex = await ctx.prisma.eSGIndex.findFirst({
      take: 1,
      select: {
        id: true,
        companyId: true,
      },
    })

    // Handle first time running or when index does not exist
    if (!companyIndex) {
      const startIndexCompany = await ctx.prisma.company.findFirst({
        select: {
          id: true,
        },
      })

      if (startIndexCompany) {
        companyIndex = await ctx.prisma.eSGIndex.create({
          data: {
            companyId: startIndexCompany.id,
          },
        })

        if (!companyIndex) {
          return 'Error creating index'
        }
      }
    }

    const companies = await ctx.prisma.company.findMany({
      take: MAX_API_CALLS,
      where: {
        id: {
          gt: companyIndex?.companyId ?? '1',
        },
      },
      select: {
        ticker: true,
        id: true,
      },
    })

    const company_tickers: Array<string> = []
    companies.forEach((company: { ticker: string; id: string }) => {
      if (company.ticker !== 'NO_TICKER_FOUND')
        company_tickers.push(company.ticker)
    })

    const url = `https://esgapiservice.com/api/authorization/search?q=${company_tickers
      .slice(0, MAX_API_CALLS)
      .join()}&token=${process.env.ESG_API_KEY ?? ''}`
    const api_res = await consumeExternalApi<ESG[]>(url)

    companies.map(async (company, index) => {
      if (company.ticker !== 'NO_TICKER_FOUND') {
        const res = await ctx.prisma.eSG.create({
          data: {
            environment_grade: api_res[index]?.environment_grade ?? '',
            environment_score: api_res[index]?.environment_score ?? 0,
            environment_level: api_res[index]?.environment_level ?? '',
            company: {
              connect: {
                id: company?.id,
              },
            },
          },
        })

        // Handle error creating ESG
        if (!res) {
          await updateESGIndex(
            ctx,
            companyIndex as companyIndexType,
            company as Company,
          )
          return 'Error creating ESG'
        }

        // Update index if last call
        if (index === MAX_API_CALLS - 1) {
          await updateESGIndex(
            ctx,
            companyIndex as companyIndexType,
            company as Company,
          )
        }
      }
    })

    return 'Success'
  }),
})
