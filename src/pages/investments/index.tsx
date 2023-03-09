import type { FC } from 'react'

import Tag from '../../components/Text/Tag'
import { api } from '../../utils/api'

const Home: FC = () => {
  const limit = 5
  const { fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, data } =
    api.company.getInvestments.useInfiniteQuery(
      {
        limit: limit,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
      },
    )

  return (
    <div>
      <h2>{isLoading && '(loading)'}</h2>
      <Tag title="sector" />
      <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </div>
  )
}

export default Home
