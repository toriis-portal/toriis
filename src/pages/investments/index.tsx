import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Sector } from '@prisma/client'

import { Select } from '../../components'
import { api } from '../../utils/api'
import { envGradeEnum, netAssetSumEnum, sectorEnum } from '../../utils/enums'
import { INDUSTRIES } from '../../utils/constants'

interface FilterOptions {
  sectors: Sector[]
  industries: string[]
  netAssetSum: number[][]
  envGrade: string[]
}

const netAssetSumCallback = (selectedOptions: string[]) => {
  const selectedNetAssetSum = selectedOptions.map((item) => {
    return netAssetSumEnum[item as keyof typeof netAssetSumEnum]
  })

  return selectedNetAssetSum
}

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

const convertToFilterOptions = (selectedFilters: string[]) => {
  if (selectedFilters && selectedFilters.length === 0) {
    return undefined
  }

  return selectedFilters
}

const Home: FC = () => {
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sectors: [],
    industries: [],
    netAssetSum: [],
    envGrade: [],
  })

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
      filterByIndustry: convertToFilterOptions(filterOptions.industries),
      filterByEnvGrade: convertToFilterOptions(
        filterOptions.envGrade,
      ) as (keyof typeof envGradeEnum)[],
      filterBySector: convertToFilterOptions(
        filterOptions.sectors,
      ) as (keyof typeof Sector)[],
      filterByNetAssetSum: filterOptions.netAssetSum,
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
  }, [refetch, selectedSortKeys, filterOptions])

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
      <div className="flex justify-center">
        <div className="flex w-3/4 flex-row justify-evenly gap-12">
          <Select
            text="Sector"
            isFilter={true}
            options={Object.values(sectorEnum)}
            updateControl={{
              type: 'on-change',
              cb: (selectedOptions) => {
                setFilterOptions({
                  ...filterOptions,
                  sectors: selectedOptions.map((item) => {
                    return item.toUpperCase().replace(' ', '_') as Sector
                  }),
                })
              },
            }}
          />
          <Select
            text="Industry"
            isFilter={true}
            isSearchable={true}
            options={INDUSTRIES}
            containerHeight="1/4"
            updateControl={{
              type: 'on-change',
              cb: (selectedOptions) => {
                setFilterOptions({
                  ...filterOptions,
                  industries: selectedOptions,
                })
              },
            }}
          />
          <Select
            text="Environmental Grade"
            shortText="Env Grade"
            isFilter={true}
            options={Object.values(envGradeEnum)}
            updateControl={{
              type: 'on-change',
              cb: (selectedOptions) => {
                setFilterOptions({
                  ...filterOptions,
                  envGrade: selectedOptions,
                })
              },
            }}
          />
          <Select
            text="Net Asset Sum"
            shortText="Net Asset"
            isFilter={true}
            options={Object.keys(netAssetSumEnum)}
            updateControl={{
              type: 'on-change',
              cb: (selectedOptions) => {
                setFilterOptions({
                  ...filterOptions,
                  netAssetSum: netAssetSumCallback(selectedOptions),
                })
              },
            }}
          />
        </div>
      </div>
      {/* <Select text="Sort By" options={[]} /> */}
    </div>
  )
}

export default Home
