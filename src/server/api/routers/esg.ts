import type { Company, ESG, ESGIndex } from '@prisma/client'
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

const maxDailyCallsReachedMessage = "Specified argument was out of the range of valid values. (Parameter 'You've reached your daily limit')"


const getFirstCompany = async (
  ctx: Context,
): Promise<{ id: string } | null> => {
  return await ctx.prisma.company.findFirst({
    select: {
      id: true,
    },
  })
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

    if (!process.env.ESG_API_KEY) {
      return 'No Key Found For ESG API'
    }

    let companyIndex = await ctx.prisma.eSGIndex.findFirst({
      select: {
        id: true,
        companyId: true,
      },
    })

    // Handle first time running or when index does not exist
    if (!companyIndex) {
      const startIndexCompany = await getFirstCompany(ctx)
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

    // Get companies and handles wraparound
    const companiesRaw = await ctx.prisma.eSGIndex.aggregateRaw({
      pipeline: [
        { $project: { _id: 0, companyId: '$companyId' } },
        { $group: { _id: null, companyId: { $first: '$companyId' } } },
        { $project: { _id: 0, companyId: '$companyId' } },
        {
          $lookup: {
            from: 'Company',
            let: { companyId: '$companyId' },
            pipeline: [
              { $match: { $expr: { $gt: ['$_id', '$$companyId'] } } },
              { $project: { _id: 1, ticker: 1 } },
            ],
            as: 'companyIds',
          },
        },
        { $project: { _id: 0, companyIds: '$companyIds' } },
        { $unwind: '$companyIds' },
        { $project: { _id: '$companyIds._id', ticker: '$companyIds.ticker' } },
        {
          $unionWith: {
            coll: 'Company',
            pipeline: [{ $limit: MAX_API_CALLS }, { $project: { _id: 1, ticker: 1 } }],
          },
        },
        { $limit: MAX_API_CALLS },
      ],
    })

    if (!Array.isArray(companiesRaw) || companiesRaw.length === 0) {
      return 'Error getting companies'
    }

    const cleanedCompanies = companiesRaw.map(
      (company: { _id: { $oid: string }; ticker: string }) => {
        return {
          id: company._id.$oid,
          ticker: company.ticker,
        }
      },
    )

    console.log(cleanedCompanies.length)

    cleanedCompanies.map(
      async (company: { ticker: string; id: string }, index: number) => {
        if (company.ticker !== 'NO_TICKER_FOUND') {
          const url = `https://esgapiservice.com/api/authorization/search?q=${
            company.ticker
          }&token=${process.env.ESG_API_KEY ?? ''}`
          const api_res = await consumeExternalApi<ESG[]>(url)
          if (isErrorMessage(api_res) && api_res.error === maxDailyCallsReachedMessage) {
            return 'Max daily calls reached'
          }

          if (isErrorMessage(api_res) || !api_res[0]) {
            // Create bad ticker log
            const res = await ctx.prisma.eSGBadTicker.create({
              data: {
                company: {
                  connect: {
                    id: company.id,
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
            const exists = await ctx.prisma.eSG.findFirst({
              where: { companyId: company.id },
            })

            // Either create or update esg depending on if it exists
            let res
            if (exists) {
              res = await ctx.prisma.eSG.update({
                where: {
                  id: exists.id,
                },
                data: {
                  environment_grade: ESGData.environment_grade,
                  environment_score: ESGData.environment_score,
                  environment_level: ESGData.environment_level,
                },
              })
            } else {
              res = await ctx.prisma.eSG.create({
                data: {
                  environment_grade: ESGData.environment_grade,
                  environment_score: ESGData.environment_score,
                  environment_level: ESGData.environment_level,
                  company: {
                    connect: {
                      id: company.id,
                    },
                  },
                },
              })
            }

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
              const res = await updateESGIndex(
                ctx,
                companyIndex as ESGIndex,
                company as Company,
              )

              if (!res) {
                return 'Error updating index'
              }
            }
          }
        }
      },
    )

    return 'Success'
  }),
})
