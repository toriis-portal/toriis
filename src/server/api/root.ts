import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/example'
import { esg } from './routers/esg'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  cronjob: esg,
})

// export type definition of API
export type AppRouter = typeof appRouter
