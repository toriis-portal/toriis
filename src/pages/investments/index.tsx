import React from 'react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Company, EnvGrade, Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import {
  Select,
  HighlightedTitle,
  ToTopButton,
  PrimaryNavBar,
  SearchBar,
  CompanyCard,
  LoadMoreButton,
} from '../../components'
import { api } from '../../utils/api'
import { sectorEnum, envGradeEnum, netAssetValEnum } from '../../utils/enums'
import { INDUSTRIES } from '../../utils/constants'

interface FilterOptions {
  sectors: Sector[]
  industries: string[]
  netAssetVal: number[][]
  envGrade: string[]
}

const netAssetValCallback = (selectedOptions: string[]) => {
  const selectedNetAssetVal = selectedOptions.map((item) => {
    return netAssetValEnum[item as keyof typeof netAssetValEnum]
  })

  return selectedNetAssetVal
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
    return 'desc'
  } else if (order === 'high to low') {
    return 'asc'
  }

  return null
}

const convertToFilterOptions = (selectedFilters: string[]) => {
  if (selectedFilters && selectedFilters.length === 0) {
    return undefined
  }

  return selectedFilters
}

const InvestmentPage: FC = () => {
  const [companySearchQuery, setCompanySearchQuery] = useState<string>(' ')
  const [dataLengthArr, setDataLengthArr] = useState<number[]>([])
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sectors: [],
    industries: [],
    netAssetVal: [],
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
    isInitialLoading,
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
      ) as (keyof typeof EnvGrade)[],
      filterBySector: convertToFilterOptions(
        filterOptions.sectors,
      ) as (keyof typeof Sector)[],
      filterByNetAssetVal: filterOptions.netAssetVal,
      searchByCompanyName: companySearchQuery,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: false,
    },
  )

  const dataLength = data?.pages
    ? (data.pages.length - 1) * limit +
      (data.pages[data.pages.length - 1]?.items.length || 0)
    : 0

  useEffect(() => {
    const refetchData = async () => {
      await refetch()

      refetchData().catch((err) => {
        console.error(err)
      })
    }
    if (!isInitialLoading) {
      setDataLengthArr((prev) => [...prev, dataLength])
    }
  }, [
    selectedSortKeys,
    companySearchQuery,
    refetch,
    dataLength,
    isInitialLoading,
  ])

  // Refetch on search result is empty
  useEffect(() => {
    if (dataLengthArr.at(-1) === 0) {
      setCompanySearchQuery(' ')
    }
  }, [dataLengthArr, refetch])

  return (
    <>
      <PrimaryNavBar />
      <div className="mb-6 flex flex-col items-center">
        <HighlightedTitle
          title="Learn About Investments"
          size="large"
          color="clementine"
        />
        <SearchBar setCompanySearchQuery={setCompanySearchQuery} />
      </div>
      <div className="mx-10 flex items-center justify-center">
        <div className="mb-8 flex w-95% basis-3/4 flex-row justify-evenly gap-4 lg:gap-14">
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
            text="Net Asset Value"
            shortText="Net Asset"
            isFilter={true}
            options={Object.keys(netAssetValEnum)}
            updateControl={{
              type: 'on-change',
              cb: (selectedOptions) => {
                setFilterOptions({
                  ...filterOptions,
                  netAssetVal: netAssetValCallback(selectedOptions),
                })
              },
            }}
          />
        </div>
      </div>
      {dataLengthArr.length > 2 && dataLengthArr.at(-2) === 0 && (
        <p className="mb-8 w-full text-center text-[22px] font-medium">
          No results found, try searching again.
        </p>
      )}
      <div className="flex w-95% flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue pb-14 xl:w-11/12">
        <div className="flex flex-row items-center justify-between self-stretch px-[3.6%] pt-[36px]">
          <div className="flex flex-col flex-wrap items-center md:flex-row md:gap-3.5">
            <p className="text-xl font-medium min-[500px]:text-3xl sm:text-[32px]">
              {companySearchQuery === ' ' ? 'Recommendations' : 'Results'}
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
              'Net Asset Value': ['low to high', 'high to low'],
            }}
            updateControl={{
              type: 'on-apply',
              cb: setSelectedSortKeys,
            }}
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
                } = { ESG: company?.ESG?.environmentGrade, company }
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

export default InvestmentPage
