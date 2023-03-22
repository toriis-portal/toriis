import type { Company, ESG, ESGIndex, EnvGrade } from '@prisma/client'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import type { Context } from '../trpc'
import { createTRPCRouter, publicProcedure } from '../trpc'

import type { UncleanedESG } from './../../../types/index'

interface ErrorMessage {
  error?: string
  message?: string
}

const MAX_API_CALLS = 50
const consumeExternalApi = async <T>(
  url: string,
): Promise<T | ErrorMessage> => {
  const res = await fetch(url, { method: 'GET' })
  console.error('res', res)
  return (await res.json()) as T
}

// Typeguard for error messages
const isErrorMessage = (
  res: ErrorMessage | ESG[] | ESG | UncleanedESG[] | UncleanedESG,
): res is ErrorMessage => {
  return 'error' in res || 'message' in res
}

const MAX_DAILY_CALLS_REACHED_MESSAGE =
  "Specified argument was out of the range of valid values. (Parameter 'You've reached your daily limit')"

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
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Expected a cronjob key, but found none.',
      })
    }

    if (!process.env.ESG_API_KEY) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Expected an ESG API key, but found none.',
      })
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
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Error creating ESG Index',
          })
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
            pipeline: [
              { $limit: MAX_API_CALLS },
              { $project: { _id: 1, ticker: 1 } },
            ],
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

    // Retrieves ESG data from API
    const companiesESG = await Promise.all(
      cleanedCompanies.map(async (company) => {
        if (company.ticker !== 'NO_TICKER_FOUND') {
          const url = `https://esgapiservice.com/api/authorization/search?q=${
            company.ticker
          }&token=${process.env.ESG_API_KEY ?? ''}`
          const api_res = await consumeExternalApi<UncleanedESG[]>(url)
          if (
            isErrorMessage(api_res) &&
            api_res.error === MAX_DAILY_CALLS_REACHED_MESSAGE
          ) {
            throw new TRPCError({
              code: 'UNAUTHORIZED',
              message: 'Max daily calls reached',
            })
          }

          // If no ESG data is found create a bad ticker entry
          if (isErrorMessage(api_res) || !api_res[0]) {
            // Check if bad ticker already exists
            const badTickerExists = await ctx.prisma.eSGInvalidTicker.findFirst(
              {
                where: {
                  companyId: company.id,
                },
              },
            )

            if (!badTickerExists) {
              const res = await ctx.prisma.eSGInvalidTicker.create({
                data: {
                  company: {
                    connect: {
                      id: company.id,
                    },
                  },
                },
              })

              if (!res) {
                throw new TRPCError({
                  code: 'INTERNAL_SERVER_ERROR',
                  message: 'Mongodb did not create item',
                })
              }
            }
          }

          // If ESG API returns nothing, return null
          if (!api_res) {
            return null
          } else if (isErrorMessage(api_res)) {
            // If ESG API returns an error, return the error
            return api_res
          }

          // Otherwise return ESG data
          return api_res[0]
        }
      }),
    )

    // Update ESG data in database
    companiesESG.forEach((companyESG, index) => {
      // Async IIFE to allow for async/await in forEach
      void (async () => {
        if (companyESG && !isErrorMessage(companyESG)) {
          const exists = await ctx.prisma.eSG.findFirst({
            where: { companyId: cleanedCompanies[index]?.id },
          })

          let res = null

          // Either create or update esg depending on if it exists
          if (exists) {
            res = await ctx.prisma.eSG.update({
              where: {
                id: exists.id,
              },
              data: {
                environmentGrade: companyESG.environment_grade as EnvGrade,
                environmentScore: companyESG.environment_score,
                environmentLevel: companyESG.environment_level,
              },
            })
          } else {
            res = await ctx.prisma.eSG.create({
              data: {
                environmentGrade: companyESG.environment_grade as EnvGrade,
                environmentScore: companyESG.environment_score,
                environmentLevel: companyESG.environment_level,
                company: {
                  connect: {
                    id: cleanedCompanies[index]?.id,
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
              cleanedCompanies[index] as Company,
            )
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Mongodb did not create ESG item',
            })
          }
        }

        // Update index if last call
        if (index === MAX_API_CALLS - 1) {
          const res = await updateESGIndex(
            ctx,
            companyIndex as ESGIndex,
            cleanedCompanies[index] as Company,
          )

          if (!res) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Mongodb did not update ESG Index',
            })
          }
        }
      })()
    })

    return 'Success'
  }),
})
