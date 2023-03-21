import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Spinner } from 'flowbite-react'

import { api } from '../../utils/api'

const Results: FC = () => {
  const limit = 5
  const companyId = '63ee97cc2c5ff254d2fcbed2'
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = api.company.getInvestmentByCompany.useInfiniteQuery(
    {
      limit: limit,
      companyId: companyId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    const refetchData = async () => {
      await refetch()
    }

    refetchData().catch((err) => {
      console.error(err)
    })
  }, [])

  if (!data) {
    return (
      <div className="text-center">
        <Spinner></Spinner>
      </div>
    )
  }
  console.log(data)

  return (
    <>
      <h2>{isLoading && '(loading)'}</h2>
      {data?.pages.map((page, index) => (
        <div className="flex flex-col gap-4" key={index}>
          {page.items.map((item) => (
            <div className="flex text-cobalt" key={item.id}>
              {item.id}
            </div>
          ))}
        </div>
      ))}
      <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </>
  )
}

export default Results
