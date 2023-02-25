import type { ESG } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

const MAX_API_CALLS = 3

const consumeExternalApi = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { method: 'GET' })
  return (await res.json()) as T
}

export const esg = createTRPCRouter({
  esgpull: publicProcedure.query(async ({ ctx }) => {
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
        await ctx.prisma.eSG.create({
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

        if (index === MAX_API_CALLS - 1) {
          await ctx.prisma.eSGIndex.update({
            where: {
              id: companyIndex?.id ?? '1',
            },
            data: {
              companyId: companies[index]?.id ?? '1',
            },
          })
        }
      }
    })

    return 'Success'
  }),
})
