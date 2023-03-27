import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Spinner } from 'flowbite-react'
import type { Investment } from '@prisma/client'
import { useRouter } from 'next/router'

import { api } from '../../utils/api'
import { InvestmentTable } from '../../components'

const Results: FC = () => {
  const [selectedSort, setSelectedSort] = useState<
    [keyof Investment, 'asc' | 'desc' | undefined]
  >(['rawName', undefined])
  const companyId = (useRouter().query.id as string) ?? ''
  const limit = 5
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
      sortKey: selectedSort[0],
      sortOrder: selectedSort[1],
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  useEffect(() => {
    const refetchData = async () => {
      await refetch()
    }

    refetchData().catch((err) => {
      console.error(err)
    })
  }, [selectedSort])

  if (!data || isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    )
  }

  const table_data: Investment[] = []

  data?.pages.forEach((page) => {
    page.items.forEach((item) => {
      table_data.push(item)
    })
  })

  return (
    <>
      <InvestmentTable
        investments={table_data}
        onSortChange={setSelectedSort}
      />
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
