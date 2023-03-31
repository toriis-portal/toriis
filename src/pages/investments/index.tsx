import { useEffect, useLayoutEffect, useState } from 'react'
import type { FC } from 'react'
import React from 'react'
import type { Company, EnvGrade } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import {
  Select,
  HighlightedTitle,
  SearchBar,
  ToTopButton,
} from '../../components'
import { api } from '../../utils/api'
import CompanyCard from '../../components/Card/CompanyCard'
import LoadMoreButton from '../../components/Buttons/LoadMoreButton'

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
const Home: FC = () => {
  const [selectedSortKeys, setSelectedSortKeys] = useState<string[]>([])
  const [companySearchQuery, setCompanySearchQuery] = useState<string>('')
  const [filteredResultsEmpty, setFilteredResultsEmpty] =
    useState<boolean>(false)

  const limit = 5
  // const fetchNextPage = null
  // const isLoading = null
  // const hasNextPage = null
  // const isFetchingNextPage = null
  // const data = []
  // const refetch = null
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
      companyName: companySearchQuery,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )
  // if (filteredResultsEmpty) {
  //   {
  //     fetchNextPage,
  //     isLoading,
  //     hasNextPage,
  //     isFetchingNextPage,
  //     data,
  //     refetch,
  //   } = api.company.getCompaniesUnfiltered.useInfiniteQuery(
  //     {
  //       limit: limit,
  //       sortByNetAssetVal: extractSortyByQueryKey(
  //         'Net Asset Value',
  //         selectedSortKeys,
  //       ),
  //       sortByEnvGrade: extractSortyByQueryKey(
  //         'Environment Grade',
  //         selectedSortKeys,
  //       ),
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //       refetchOnWindowFocus: false,
  //       cacheTime: 0,
  //     },
  //   )
  // }

  const dataLength = data?.pages
    ? (data.pages.length - 1) * limit +
      // TODO: does this work? recommendations just has init length
      (data.pages[data.pages.length - 1]?.items.length || 0)
    : 0

  useEffect(() => {
    // console.log(filteredDataLength)
    const refetchData = async () => {
      await refetch()

      refetchData().catch((err) => {
        console.error(err)
      })
    }
    console.log('first launch')
    if (dataLength < 1) {
      console.log(dataLength)
      setFilteredResultsEmpty(true)
    } else {
      setFilteredResultsEmpty(false)
    }
  }, [selectedSortKeys, companySearchQuery])
  // console.log(filteredDataLength)

  // if filtered results has no results, then
  // - conditionally run unfiltered companies query
  // - display "No results found"
  // - display "Recommendations" instead of "Results"
  // - set data to results of unfiltered query

  useEffect(() => {
    if (!isLoading && dataLength < 1) {
      console.log(dataLength)
      setFilteredResultsEmpty(true)
    }
  }, [dataLength])

  // useEffect(() => {
  //   if (!isLoading && filteredDataLength >= 1) {
  //     console.log(filteredDataLength)
  //     setFilteredResultsEmpty(false)
  //   }
  // }, [companySearchQuery]) // TODO: also watch other selectors

  console.log(data)
  console.log(dataLength)
  console.log(filteredResultsEmpty)

  return (
    <div className="flex flex-col items-center">
      <HighlightedTitle
        title="Learn About Investments"
        size="large"
        color="clementine"
      />
      <SearchBar setCompanySearchQuery={setCompanySearchQuery} />
      {/* TODO: make blue bkgd stretch to the bottom when fewer resulsts too */}
      {/* {resultsEmpty && (
        <p className="py-12 text-[22px] font-medium">
          No results found, try searching again.
        </p>
      )} */}
      <div className="flex w-[95vw] flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue pb-20 xl:w-11/12">
        <div className="flex flex-row items-center justify-between self-stretch px-[3.6%] pt-[36px]">
          <div className="flex flex-col flex-wrap items-center md:flex-row md:gap-3.5">
            <p className="text-xl font-medium min-[500px]:text-3xl sm:text-[32px]">
              Recommendations
              {/* TODO: or Results conditionally */}
            </p>
            <p className="text-medGray">
              {'('}
              {dataLength}
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
        ></LoadMoreButton>
        <ToTopButton />
      </div>
    </div>
  )
}

export default Home
