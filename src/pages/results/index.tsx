import { useEffect } from 'react'
import type { FC } from 'react'
import { Spinner } from 'flowbite-react'
import type { Investment } from '@prisma/client'

import { api } from '../../utils/api'
import { InvestmentTable } from '../../components'

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
  }, [refetch])

  if (!data) {
    return (
      <div className="text-center">
        <Spinner></Spinner>
      </div>
    )
  }

  const table_data: Investment[] = []

  {
    data?.pages.map((page, index) => (
      <div className="flex flex-col gap-4" key={index}>
        {page.items.map((item) => table_data.push(item))}
      </div>
    ))
  }

  return (
    <>
      <h2>{isLoading && '(loading)'}</h2>
      <InvestmentTable investments={table_data} />
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
