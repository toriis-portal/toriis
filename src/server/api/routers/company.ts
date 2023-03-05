import { createTRPCRouter, publicProcedure } from '../trpc'

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
