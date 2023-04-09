import { createTRPCRouter, protectedProcedure } from '../trpc'

export const requestRouter = createTRPCRouter({
  getAllRequests: protectedProcedure.query(async ({ ctx }) => {
    const requests = await ctx.prisma.reviewRequest.findMany({})
    return requests
  }),
})
