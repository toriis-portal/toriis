import type { FC } from 'react'

import { api } from '../../utils/api'

const Home: FC = () => {
  const investmentQuery = api.investment.getInvestments.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      //getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  )
  console.log(investmentQuery)
  return <div>Learn about Investments</div>
}

export default Home
