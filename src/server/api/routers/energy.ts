import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../../../utils/helpers'

export const energyRouter = createTRPCRouter({
  getEnergyBySkipTake: skipTakeRequest,
})
