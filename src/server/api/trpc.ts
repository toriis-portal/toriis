/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * tl;dr - This is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the
 * database, the session, etc.
 */
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { type Session } from 'next-auth'
import type { inferAsyncReturnType } from '@trpc/server'
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import NodeCache from 'node-cache'

import { getServerAuthSession } from '../auth'
import { prisma } from '../db'

type CreateContextOptions = {
  session: Session | null
}

// Create Cache
const cacheSingleton = new NodeCache()

// A map of cached procedure names to a callable that gives a TTL in seconds
const cachedProcedures: Map<string, (() => number) | undefined> = new Map()
cachedProcedures.set('companyRouter.getNetAssetValBySector', () => 2 * 3600) // 2 hours

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  }
}

/**
 * This is the actual context you will use in your router. It will be used to
 * process every request that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts

  // Get the session from the server using the getServerSession wrapper function
  const session = await getServerAuthSession({ req, res })

  return createInnerTRPCContext({
    session,
  })
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and
 * transformer.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in.
 */
export const publicProcedure = t.procedure

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure.
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

const middlewareMarker = 'middlewareMarker' as 'middlewareMarker' & {
  __brand: 'middlewareMarker'
}

/**
 * Cache middleware that checks cache before running the procedure.
 */
const checkCache = t.middleware(async ({ ctx, next, path, type, rawInput }) => {
  if (type !== 'query' || !cachedProcedures.has(path)) {
    return next()
  }
  let key = path
  if (rawInput) {
    key += JSON.stringify(rawInput).replace(/\"/g, "'")
  }

  const cachedData = cacheSingleton.get(key)
  if (cachedData) {
    console.log('Previously cached!')
    return {
      ok: true,
      data: cachedData,
      ctx,
      marker: middlewareMarker,
    }
  }
  const result = await next()

  console.log('USE CACHE!')
  console.log(result)

  // data is not defined in the type MiddlewareResult
  const dataCopy = structuredClone(result)

  const ttlSecondsCallable = cachedProcedures.get(path)
  if (ttlSecondsCallable) {
    cacheSingleton.set(key, dataCopy, ttlSecondsCallable())
  } else {
    cacheSingleton.set(key, dataCopy)
  }
  return result
})

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees `ctx.session.user` is
 * not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

/**
 * Cached procedure
 *
 * If you want a query or mutation to always check for cached response, use
 * this. It checks
 *
 * @see https://trpc.io/docs/procedures
 */
export const cachedProcedure = t.procedure.use(checkCache)
