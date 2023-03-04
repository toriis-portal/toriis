import type { FC } from 'react'

import { api } from '../../utils/api'

const Home: FC = () => {
  const limit = 5
  const { fetchNextPage, isLoading, data } =
    api.investment.getInvestments.useInfiniteQuery(
      {
        limit: limit,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
      },
    )

  console.log(data)

  return (
    <div>
      <h2>{isLoading && '(loading)'}</h2>
      <div className="flex flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">Company Name</h1>
          {data?.pages.map((page, index) => (
            <div
              className="flex flex-col gap-4"
              key={page.items[0]?.id || index}
            >
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
            <div
              className="flex flex-col gap-4"
              key={page.items[0]?.id || index}
            >
              {page.items.map((item) => (
                <div className="flex text-black" key={item.id}>
                  {item.sector}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-medium">Asset Sum</h1>
          {data?.pages.map((page, index) => (
            <div
              className="flex flex-col gap-4"
              key={page.items[0]?.id || index}
            >
              {page.items.map((item) => (
                <div className="flex text-pumpkin" key={item.id}>
                  {item.asset_sum}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
      >
        Load More
      </button>
    </div>
  )
}

export default Home
