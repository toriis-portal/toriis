import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Welcome to ${input.text}`,
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'Secret message: SECS is the best team!'
  }),
})

export const companyRouter = createTRPCRouter({
  countByInvestment: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.company.groupBy({
      by: ['sector'],
      _count: {
        sector: true,
      },
    })
  }),
})
