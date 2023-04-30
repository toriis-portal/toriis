import { requestRouter } from './routers/request'
import { createTRPCRouter } from './trpc'
import { companyRouter } from './routers/company'
import { esgRouter } from './routers/esg'
import { userRouter } from './routers/user'
import { investmentRouter } from './routers/investment'
import { fuelRouter } from './routers/fuel'
import { energyRouter } from './routers/energy'
import { emissionRouter } from './routers/emission'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  company: companyRouter,
  user: userRouter,
  cronjob: esgRouter,
  request: requestRouter,
  investment: investmentRouter,
  fuel: fuelRouter,
  energy: energyRouter,
  emission: emissionRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
