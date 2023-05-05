import React from 'react'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import type { Company, EnvGrade, Sector } from '@prisma/client'
import { Spinner } from 'flowbite-react'
import { clsx } from 'clsx'

import {
  Select,
  HighlightedTitle,
  ToTopButton,
  PrimaryNavBar,
  SearchBar,
  Tag,
  CompanyCard,
  LoadMoreButton,
  ToolTip,
  Footer,
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
    return key == 'Environment Grade' ? 'desc' : 'asc'
  } else if (order === 'high to low') {
    return key == 'Environment Grade' ? 'asc' : 'desc'
  }

  return null
}

const convertToFilterOptions = (selectedFilters: string[]) => {
  if (selectedFilters && selectedFilters.length === 0) {
    return undefined
  }

  return selectedFilters
}

const initialSearchQuery = ' '
const initialFilterOptions: FilterOptions = {
  sectors: [],
  industries: [],
  netAssetVal: [],
  envGrade: [],
}

const SelectGroupStyle = clsx('flex flex-row gap-2 basis-1/4')

const InvestmentPage: FC = () => {
  const [companySearchQuery, setCompanySearchQuery] =
    useState<string>(initialSearchQuery)
  const [dataLengthArr, setDataLengthArr] = useState<number[]>([])
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(initialFilterOptions)

  const limit = 10

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

  const lastSearchIsEmpty =
    dataLengthArr.length > 2 && dataLengthArr.at(-2) === 0

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
      setCompanySearchQuery(initialSearchQuery)
      setFilterOptions(initialFilterOptions)
    }
  }, [dataLengthArr, refetch])

  return (
    <>
      <PrimaryNavBar />
      <div className="mx-8 lg:mx-14">
        <div className="mb-6 flex w-full flex-col items-center">
          <HighlightedTitle
            title="Learn About Investments"
            size="large"
            color="clementine"
          />
          <div className="w-11/12 lg:w-9/12">
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
            />
            <ToolTip
              title="Definition"
              details="A sector is comprised of many industries and is used to describe large components of the overall economy (eg, Energy)."
            />
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
            />
            <ToolTip
              title="Definition"
              details="An industry is comprised of companies that are closely related in their business activities and is used to describe nuanced components of a larger sector (eg, Oil & Gas)."
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
            />
            <ToolTip
              title="Definition"
              details={
                <div className="flex flex-col gap-2">
                  An Environmental, Social, and Governance (ESG) rating that
                  aims to measure how sustainably a company is conducting
                  business and managing ESG risk factors.
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
                    netAssetVal: netAssetValCallback(selectedOptions),
                  })
                },
              }}
            />
            <ToolTip
              title="Definition"
              details="The total market value of all of a company's corporate bonds."
            />
          </div>
        </div>
        {lastSearchIsEmpty && (
          <p className="header-2 mb-8 w-full text-center">
            No results found, try searching again.
          </p>
        )}
        <div className="flex w-full flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue pb-14">
          <div className="mt-9 mb-4 flex flex-row items-center justify-between self-stretch px-[3.6%]">
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
