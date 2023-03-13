import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { EnvGrade, Sector } from '@prisma/client'

import { Select } from '../../components'
import { api } from '../../utils/api'
import {
  envGradeEnum,
  netAssetSumEnum,
  netAssetValueEnum,
  sectorEnum,
} from '../../utils/enums'

const extractSortyByQueryKey = (
  key: 'Net Asset Sum' | 'Environment Grade',
  selectedSorts: string[],
) => {
  const selectedSort = selectedSorts.find((item) => {
    const [field, _order] = item.split('-')
    return field === key
  })

  if (!selectedSort) {
    return null
  }

  const [_field, order] = selectedSort.split('-')

  if (order === 'low to high') {
    return 'asc'
  } else if (order === 'high to low') {
    return 'desc'
  }

  return null
}

const Home: FC = () => {
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])

  const limit = 5
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = api.company.getInvestments.useInfiniteQuery(
    {
      limit: limit,
      sortByNetAssestSum: extractSortyByQueryKey(
        'Net Asset Sum',
        selectedSortKeys,
      ),
      sortByEnvGrade: extractSortyByQueryKey(
        'Environment Grade',
        selectedSortKeys,
      ),
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
  }, [selectedSortKeys])

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
      <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
      <div className="flex flex-row gap-0">
        <Select
          text="Sector"
          isFilter={true}
          options={Object.values(sectorEnum)}
        />
        <Select
          text="Industry"
          isFilter={true}
          isSearchable={true}
          options={Object.values(sectorEnum)}
        />
        <Select
          text="Environmental Grade"
          isFilter={true}
          options={Object.values(envGradeEnum)}
        />
        <Select
          text="Net Asset Sum"
          isFilter={true}
          options={Object.values(netAssetSumEnum)}
        />
      </div>
      <Select text="Sort By" options={[]} />
    </div>
  )
}

export default Home
