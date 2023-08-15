import React, { useRef } from 'react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Company, EnvGrade, Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'
import { clsx } from 'clsx'

import {
  Select,
  UnderlinedTitle,
  ToTopButton,
  PrimaryNavBar,
  SearchBar,
  Tag,
  CompanyCard,
  LoadMoreButton,
  ToolTip,
  Footer,
  Toast,
} from '../../components'
import { api } from '../../utils/api'
import { sectorEnum, envGradeEnum, netAssetValEnum } from '../../utils/enums'
import { INDUSTRIES, TOOLTIP_DEFINITIONS } from '../../utils/constants'

interface FilterOptions {
  sectors: Sector[]
  industries: string[]
  netAssetVal: number[][]
  envGrade: string[]
}

/**
 * Sort options to query parsing
 *
 * @param key One of 'Net Asset Value' or 'Environment Grade'
 * @param selectedSorts Sort string in the format of 'field-order' (e.g. 'Net Asset Value-low to high')
 * @returns 'asc' or 'desc' depending on the sort order
 */
const extractSortByQueryKey = (
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
    return key == 'Environment Grade' ? 'desc' : 'asc'
  } else if (order === 'high to low') {
    return key == 'Environment Grade' ? 'asc' : 'desc'
  }
  return null
}

/**
 * General filter options to query parsing
 *
 * @param selectedFilters
 * @returns
 */
const convertToFilterOptions = (selectedFilters: string[]) => {
  if (selectedFilters && selectedFilters.length === 0) {
    return undefined
  }
  return selectedFilters
}

/**
 * Filter options to query parsing for net asset value,
 * converts string[] to number[][]
 *
 * @param selectedOptions Array of selected Net Asset Value options
 * @returns An array of net asset value ranges
 */
const convertToNetAssetValFilterOptions = (selectedOptions: string[]) => {
  const selectedNetAssetVal = selectedOptions.map((item) => {
    return netAssetValEnum[item as keyof typeof netAssetValEnum]
  })
  return selectedNetAssetVal
}

/**
 * Initial values for the search query, filter options, and sorting options
 */
const limit = 10
const initialSearchQuery = ' '
const initialFilterOptions: FilterOptions = {
  sectors: [],
  industries: [],
  netAssetVal: [],
  envGrade: [],
}

const SelectGroupStyle = clsx('flex flex-row gap-2 basis-1/4 items-center')

const InvestmentPage: FC = () => {
  const [companySearchQuery, setCompanySearchQuery] =
    useState<string>(initialSearchQuery)
  const [lastSearchIsEmpty, setLastSearchIsEmpty] = useState<boolean>(false)
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions)
  const previousDataLength = useRef<number>(limit)

  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    refetch,
  } = api.company.getCompanies.useInfiniteQuery(
    {
      limit: limit,
      sortByNetAssetVal: extractSortByQueryKey(
        'Net Asset Value',
        selectedSortKeys,
      ),
      sortByEnvGrade: extractSortByQueryKey(
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
      onSuccess: (newData) => {
        const newDataLength = newData.pages[0]?.items?.length || 0
        if (previousDataLength.current !== 0) {
          setLastSearchIsEmpty(false)
        }
        if (newDataLength === 0) {
          setCompanySearchQuery(initialSearchQuery)
          setFilterOptions(initialFilterOptions)
          setLastSearchIsEmpty(true)
        }
        previousDataLength.current = newDataLength
      },
    },
  )

  useEffect(() => {
    const refetchData = async () => {
      await refetch()
    }
    void refetchData()
  }, [selectedSortKeys, companySearchQuery, refetch])

  return (
    <>
      <PrimaryNavBar />
      <div className="mx-8 lg:mx-14">
        <div className="mb-6 flex w-full flex-col items-center">
          <div className="flex justify-center">
            <UnderlinedTitle
              title="Investment Database&nbsp;"
              size="large"
              color="white"
            />
            <UnderlinedTitle title="FY 2022" size="large" color="clementine" />
          </div>
          <div className="w-full md:w-9/12">
            <SearchBar setCompanySearchQuery={setCompanySearchQuery} />
          </div>
        </div>
        <div className="mb-8 flex basis-3/4 flex-col justify-evenly gap-4 md:flex-row lg:mx-20 lg:gap-10">
          <div className={SelectGroupStyle}>
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
              shouldClearChecked={
                lastSearchIsEmpty && previousDataLength.current == 0
              }
            />
            <ToolTip title="Definition" details={TOOLTIP_DEFINITIONS.SECTOR} />
          </div>
          <div className={SelectGroupStyle}>
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
              shouldClearChecked={
                lastSearchIsEmpty && previousDataLength.current == 0
              }
            />
            <ToolTip
              title="Definition"
              details={TOOLTIP_DEFINITIONS.INDUSTRY}
            />
          </div>
          <div className={SelectGroupStyle}>
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
              shouldClearChecked={
                lastSearchIsEmpty && previousDataLength.current == 0
              }
            />
            <ToolTip
              title="Definition"
              details={
                <div className="flex flex-col gap-2">
                  {TOOLTIP_DEFINITIONS.ESG}
                  <div>
                    <Tag
                      title="AAA"
                      className="body-small float-left mr-2 bg-brightTeal text-white"
                    />
                    indicates strong management and low risk.
                    <Tag
                      title="CCC"
                      className="body-small float-left mr-2 bg-pumpkin text-white"
                    />
                    indicates weak management and high risk.
                  </div>
                </div>
              }
            />
          </div>

          <div className={SelectGroupStyle}>
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
                    netAssetVal:
                      convertToNetAssetValFilterOptions(selectedOptions),
                  })
                },
              }}
              shouldClearChecked={
                lastSearchIsEmpty && previousDataLength.current == 0
              }
            />
            <ToolTip
              title="Definition"
              details={TOOLTIP_DEFINITIONS.NET_ASSET_VAL}
            />
          </div>
        </div>
        {lastSearchIsEmpty && (
          <p className="header-2 mb-8 w-full text-center">
            No results found, try searching again.
          </p>
        )}
        <div className="flex w-full flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue pb-14">
          <div className="mb-4 mt-9 flex flex-row items-center justify-between self-stretch px-[3.6%]">
            <div className="flex flex-col flex-wrap items-center md:flex-row md:gap-3.5">
              <p className="header-2">Results</p>
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
              shouldClearChecked={lastSearchIsEmpty}
            />
          </div>
          {data?.pages.map((page, idx) => {
            return (
              <div
                key={idx}
                className="flex w-11/12 flex-col gap-[1.5vw] min-[1130px]:w-10/12 xl:w-10/12"
              >
                {page.items.map((company) => {
                  const companyWithESG: { ESG: EnvGrade | undefined } & {
                    company: Company
                  } = { ESG: company?.ESG?.environmentGrade, company }
                  return (
                    <React.Fragment key={company.id}>
                      <CompanyCard companyInfo={companyWithESG} />
                    </React.Fragment>
                  )
                })}
              </div>
            )
          })}
          {isLoading && <Spinner />}
          {error && <Toast type="error" message={error.message} />}
          <LoadMoreButton
            onClick={() => {
              void fetchNextPage()
            }}
            disabled={!hasNextPage || isFetchingNextPage}
          />
          <ToTopButton />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default InvestmentPage
