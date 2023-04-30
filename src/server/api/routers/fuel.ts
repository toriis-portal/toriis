import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../helper'

export const fuelRouter = createTRPCRouter({
  getFuelsBySkipTake: skipTakeRequest,
})
