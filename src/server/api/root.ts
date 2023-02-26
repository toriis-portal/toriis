import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/example'
import { esgRouter } from './routers/esg'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  cronjob: esgRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
