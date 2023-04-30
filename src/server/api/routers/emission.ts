import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../helper'

export const emissionRouter = createTRPCRouter({
  getEmissionsBySkipTake: skipTakeRequest,
})
