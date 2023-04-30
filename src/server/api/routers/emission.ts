import { createTRPCRouter } from '../trpc'
import { skipTakeRequest } from '../../../utils/helpers'

export const emissionRouter = createTRPCRouter({
  getEmissionsBySkipTake: skipTakeRequest,
})
