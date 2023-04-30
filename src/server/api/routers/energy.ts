import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../helper'

export const energyRouter = createTRPCRouter({
  getEnergyBySkipTake: skipTakeRequest,
})
