import { z } from 'zod'
import type { Company } from '@prisma/client'
import type { PrismaClient } from '@prisma/client'

import { createTRPCRouter, publicProcedure } from '../trpc'

export async function getCompanyByID({
  prisma,
  input,
}: {
  prisma: PrismaClient
  input: string
}): Promise<Company | null> {
  const company: Company | null = await prisma.company
    .findUnique({
      where: {
        id: input,
      },
    })
    .catch(() => {
      return null
    })
  return company
}

export async function getCompanyTicker({
  prisma,
  input,
}: {
  prisma: PrismaClient
  input: string
}): Promise<string> {
  const company: Company | null = await getCompanyByID({
    prisma: prisma,
    input,
  })

  if (company && company.ticker) {
    return company.ticker
  }
  return 'Invalid CompanyID: No Ticker Found'
}

export const companyRouter = createTRPCRouter({
  getTicker: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return getCompanyTicker({ prisma: ctx.prisma, input })
  }),
})
