import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/example'
import { esgRouter } from './routers/esg'
import { investmentRouter } from './routers/investment'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  investment: investmentRouter,
  cronjob: esgRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
