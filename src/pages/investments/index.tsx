import type { FC } from 'react'

import { api } from '../../utils/api'
import LoadMoreButton from '../../components/Buttons/LoadMoreButton'

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
      <div className="flex flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">Company Name</h1>
          {data?.pages.map((page, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {page.items.map((item) => (
                <div className="flex text-cobalt" key={item.id}>
                  {item.name}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">Sector</h1>
          {data?.pages.map((page, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {page.items.map((item) => (
                <div className="flex text-black" key={item.id}>
                  {item.sector}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">Industry</h1>
          {data?.pages.map((page, index) => (
            <div className="flex flex-col gap-4" key={index}>
              {page.items.map((item) => (
                <div className="flex text-pumpkin" key={item.id}>
                  {item.industry}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      > */}
      {/* Load More
      </button> */}
      <LoadMoreButton />
    </div>
  )
}

export default Home
