import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const ESGCronJobProcedure = createTRPCRouter({
  ESGCronJob: protectedProcedure.query(({ ctx }) => {
    const companies = ctx.prisma.company.findMany({
      take: 50,
    })

    console.log(companies)
    // companies.forEach(async (company) => {
    //   const { data } = await fetch(`https://esgapiservice.com/api/authorization/search?q=msft,v,intc&token=${secrets.ESG_API_KEY}$`)

    // return ctx.prisma.eSG.create({
    //     data: {})
  }),
})
