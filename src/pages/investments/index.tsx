import { useEffect, useState } from 'react'
import type { FC } from 'react'
import type { Sector } from '@prisma/client'
import React from 'react'
import type { Company, EnvGrade } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { Select, ToTopButton } from '../../components'
import { api } from '../../utils/api'
import { envGradeEnum } from '../../utils/enums'
import { netAssetSumEnum, sectorEnum } from '../../utils/enums'
import { INDUSTRIES } from '../../utils/constants'
import LoadMoreButton from '../../components/Buttons/LoadMoreButton'
import CompanyCard from '../../components/Card/CompanyCard'

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
  key: 'Net Asset Value' | 'Environment Grade',
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
  } = api.company.getCompanies.useInfiniteQuery(
    {
      limit: limit,
      sortByNetAssetVal: extractSortyByQueryKey(
        'Net Asset Value',
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
      filterByNetAssetVal: filterOptions.netAssetSum,
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
    <>
      <div className="mx-10 flex items-center justify-center">
        <div className="flex w-95% basis-3/4 flex-row justify-evenly gap-14 pb-4">
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
      <div className="flex w-95% flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue py-28 xl:w-11/12">
        <div className="flex flex-row items-center justify-between self-stretch px-[3.6%] pt-[36px]">
          <div className="flex flex-col flex-wrap items-center md:flex-row md:gap-3.5">
            <p className="text-xl font-medium min-[500px]:text-3xl sm:text-[32px]">
              Recommendations
            </p>
            <p className="text-medGray">
              {'('}
              {data?.pages
                ? (data.pages.length - 1) * limit +
                  (data.pages[data.pages.length - 1]?.items.length || 0)
                : 0}
              {' results)'}
            </p>
          </div>
          <Select
            text="sort by"
            options={{
              'Environment Grade': ['low to high', 'high to low'],
              'Net Asset Sum': ['low to high', 'high to low'],
            }}
            updateControl={{
              type: 'on-apply',
              cb: setSelectedSortKeys,
            }}
            isSearchable={true}
          />
        </div>
        {data?.pages.map((page, idx) => {
          return (
            <div
              key={idx}
              className="flex w-11/12 flex-col gap-[1.5vw] min-[1130px]:w-10/12 xl:w-[65vw]"
            >
              {page.items.map((company) => {
                const company2: { ESG: EnvGrade | undefined } & {
                  company: Company
                } = { ESG: company?.ESG[0]?.environmentGrade, company }
                return (
                  <React.Fragment key={company.id}>
                    <CompanyCard companyInfo={company2} />
                  </React.Fragment>
                )
              })}
            </div>
          )
        })}

        {isLoading && <Spinner />}

        <LoadMoreButton
          onClick={() => {
            void fetchNextPage()
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        />
        <ToTopButton />
      </div>
    </>
  )
}

export default Home
