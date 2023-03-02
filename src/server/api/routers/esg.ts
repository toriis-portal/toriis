import type { ESG } from '@prisma/client'
import type { Company, ESGIndex } from '@prisma/client'
import { z } from 'zod'

import type { Context } from '../trpc'
import { createTRPCRouter, publicProcedure } from '../trpc'

interface errorMessage {
  error?: string
  message?: string
}

const MAX_API_CALLS = 50
const consumeExternalApi = async <T>(
  url: string,
): Promise<T | errorMessage> => {
  const res = await fetch(url, { method: 'GET' })
  return (await res.json()) as T
}

// Typeguard for error messages
const isErrorMessage = (res: errorMessage | ESG[]): res is errorMessage => {
  return 'error' in res || 'message' in res
}

const updateESGIndex = async (
  ctx: Context,
  companyIndex: ESGIndex,
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

export const esgRouter = createTRPCRouter({
  esgpull: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    if (input !== process.env.CRONJOB_KEY) {
      return 'Not Authorized'
    }

    let companyIndex = await ctx.prisma.eSGIndex.findFirst({
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

    companies.map(
      async (company: { ticker: string; id: string }, index: number) => {
        if (company.ticker !== 'NO_TICKER_FOUND') {
          const url = `https://esgapiservice.com/api/authorization/search?q=${
            company.ticker
          }&token=${process.env.ESG_API_KEY ?? ''}`
          const api_res = await consumeExternalApi<ESG[]>(url)

          if (isErrorMessage(api_res) || !api_res[0]) {
            const res = await ctx.prisma.eSGBadTicker.create({
              data: {
                company: {
                  connect: {
                    id: company?.id,
                  },
                },
              },
            })

            if (!res) {
              return 'Failed to create bad ticker log'
            }

            return 'No data returned or max calls reached'
          } else {
            const ESGData = api_res[0]
            const res = await ctx.prisma.eSG.create({
              data: {
                environment_grade: ESGData.environment_grade,
                environment_score: ESGData.environment_score,
                environment_level: ESGData.environment_level,
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
                companyIndex as ESGIndex,
                company as Company,
              )
              return 'Error creating ESG'
            }

            // Update index if last call
            if (index === MAX_API_CALLS) {
              await updateESGIndex(
                ctx,
                companyIndex as ESGIndex,
                company as Company,
              )
            }
          }
        }
      },
    )

    return 'Success'
  }),
})
