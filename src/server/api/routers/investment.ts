import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../helper'

export const investmentRouter = createTRPCRouter({
  getInvestmentsBySkipTake: skipTakeRequest,
})
