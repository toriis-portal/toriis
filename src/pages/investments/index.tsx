import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Sector } from '@prisma/client'

import { Select } from '../../components'
import { api } from '../../utils/api'
import { envGradeEnum, netAssetSumEnum, sectorEnum } from '../../utils/enums'

const INDUSTRIES = [
  'Aerospace & Defense',
  'Agricultural Inputs',
  'Airlines',
  'Asset Management',
  'Auto & Truck Dealerships',
  'Auto Manufacturers',
  'Auto Parts',
  'Banks—Diversified',
  'Banks—Regional',
  'Beverages—Brewers',
  'Beverages—Non-Alcoholic',
  'Beverages—Wineries & Distilleries',
  'Biotechnology',
  'Building Materials',
  'Building Products & Equipment',
  'Capital Markets',
  'Communication Equipment',
  'Computer Hardware',
  'Confectioners',
  'Conglomerates',
  'Consumer Electronics',
  'Credit Services',
  'Diagnostics & Research',
  'Drug Manufacturers—General',
  'Drug Manufacturers—Specialty & Generic',
  'Electronic Components',
  'Electronic Gaming & Multimedia',
  'Entertainment',
  'Farm & Heavy Construction Machinery',
  'Farm Products',
  'Financial Data & Stock Exchanges',
  'Food Distribution',
  'Gold',
  'Health Information Services',
  'Healthcare Plans',
  'Home Improvement Retail',
  'Household & Personal Products',
  'Industrial Distribution',
  'Information Technology Services',
  'Insurance Brokers',
  'Insurance—Diversified',
  'Insurance—Life',
  'Internet Content & Information',
  'Internet Retail',
  'Leisure',
  'Lodging',
  'Medical Devices',
  'Medical Distribution',
  'Medical Instruments & Supplies',
  'Mortgage Finance',
  'Oil & Gas E&P',
  'Oil & Gas Equipment & Services',
  'Oil & Gas Integrated',
  'Oil & Gas Midstream',
  'Oil & Gas Refining & Marketing',
  'Other Industrial Metals & Mining',
  'Packaged Foods',
  'Packaging & Containers',
  'Pharmaceutical Retailers',
  'Publishing',
  'REIT—Healthcare Facilities',
  'REIT—Office',
  'REIT—Residential',
  'REIT—Retail',
  'REIT—Specialty',
  'Railroads',
  'Rental & Leasing Services',
  'Restaurants',
  'Scientific & Technical Instruments',
  'Semiconductor Equipment & Materials',
  'Semiconductors',
  'Shell Companies',
  'Software—Application',
  'Software—Infrastructure',
  'Solar',
  'Specialty Business Services',
  'Specialty Chemicals',
  'Specialty Industrial Machinery',
  'Specialty Retail',
  'Steel',
  'Telecom Services',
  'Tobacco',
  'Tools & Accessories',
  'Utilities—Diversified',
  'Utilities—Independent Power Producers',
  'Utilities—Regulated Electric',
  'Utilities—Regulated Gas',
  'Waste Management',
]

interface FilterOptions {
  sectors: Sector[]
  industries: string[]
  netAssetSum: number[][]
  envGrade: string[]
}

const mergeIntervals = (intervals: number[][]) => {
  if (intervals.length <= 1) {
    return intervals
  }

  const sortedIntervals = intervals.sort()

  for (let i = 0; i < sortedIntervals.length - 1; i++) {
    const currentInterval = sortedIntervals[i]
    const nextInterval = sortedIntervals[i + 1]

    if (
      currentInterval &&
      nextInterval &&
      currentInterval[1] &&
      nextInterval[0] &&
      nextInterval[1]
    ) {
      if (currentInterval[1] == nextInterval[0]) {
        currentInterval[1] = nextInterval[1]
        sortedIntervals.splice(i + 1, 1)
        i--
      }
    }
  }

  return sortedIntervals
}

const netAssetSumCallback = (selectedOptions: string[]) => {
  const selectedNetAssetSum = selectedOptions.map((item) => {
    return netAssetSumEnum[item as keyof typeof netAssetSumEnum]
  })

  return mergeIntervals(selectedNetAssetSum)
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
  const [isFilterOperation, setIsFilterOperation] = useState<boolean>(false)
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
      isFilterOperation: isFilterOperation,
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
      <div className="flex flex-row gap-0">
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
          containerHeight="240px"
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
      {/* <Select text="Sort By" options={[]} /> */}
    </div>
  )
}

export default Home
