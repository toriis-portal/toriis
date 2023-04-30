import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../../../utils/helpers'

export const fuelRouter = createTRPCRouter({
  getFuelsBySkipTake: skipTakeRequest,
})
