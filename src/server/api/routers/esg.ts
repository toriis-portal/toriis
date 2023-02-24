import type { ESG } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

const consumeExternalApi = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { method: 'GET' })
  return (await res.json()) as T
}

export const esg = createTRPCRouter({
  esgpull: publicProcedure.query(async ({ ctx }) => {
    const companies = await ctx.prisma.company.findMany({
      take: 3,
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
      .slice(0, 3)
      .join()}&token=${process.env.ESG_API_KEY ?? ''}`
    const api_res = await consumeExternalApi<ESG[]>(url)

    companies.map(async (company, index) => {
      if (company.ticker !== 'NO_TICKER_FOUND') {
        const res = await ctx.prisma.eSG.create(
          {
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
          },

          // TODO: add error catching
        )
      }
    })
  }),
})
