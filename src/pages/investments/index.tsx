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
  const [companySearchQuery, setCompanySearchQuery] = useState<string>('')
  // const [prevResultsEmpty, setPrevResultsEmpty] = useState<boolean>(false)

  const limit = 5
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
    resultsEmpty,
  } = api.company.getCompanies.useInfiniteQuery(
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
      companyName: companySearchQuery,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  console.log(resultsEmpty)

  useEffect(() => {
    console.log('refecth effect called')
    const refetchData = async () => {
      await refetch()

      refetchData().catch((err) => {
        console.error(err)
      })
    }
  }, [selectedSortKeys, companySearchQuery])

  const dataLength = data?.pages
    ? (data.pages.length - 1) * limit +
      // TODO: does this work? recommendations just has init length
      (data.pages[data.pages.length - 1]?.items.length || 0)
    : 0
  // useEffect(() => {
  //   console.log(dataLength)
  //   if (dataLength >= 1) {
  //     setPrevResultsEmpty(false)
  //   } else {
  //     setPrevResultsEmpty(true)
  //   }
  // }, [dataLength])

  return (
    //   {dataExists &&
    //     (data?.pages[0]?.items?.length < 1 ? (
    //       <p className="py-12 text-[22px] font-medium">
    //         No results found, try searching again.
    //       </p>
    //     ) : (
    //       <>
    //         <div className="flex flex-row">
    //           <div className="flex flex-col gap-4">
    //             <h1 className="font-medium">Company Name</h1>
    //             {data?.pages.map((page, index) => (
    //               <div className="flex flex-col gap-4" key={index}>
    //                 {page.items.map((item) => (
    //                   <div className="flex text-cobalt" key={item.id}>
    //                     {item.name}
    //                   </div>
    //                 ))}
    //               </div>
    //             ))}
    //           </div>
    //           <div className="flex flex-col gap-4">
    //             <h1 className="font-medium">Sector</h1>
    //             {data?.pages.map((page, index) => (
    //               <div className="flex flex-col gap-4" key={index}>
    //                 {page.items.map((item) => (
    //                   <div className="flex text-black" key={item.id}>
    //                     {item.sector}
    //                   </div>
    //                 ))}
    //               </div>
    //             ))}
    //           </div>
    //           <div className="flex flex-col gap-4">
    //             <h1 className="font-medium">Industry</h1>
    //             {data?.pages.map((page, index) => (
    //               <div className="flex flex-col gap-4" key={index}>
    //                 {page.items.map((item) => (
    //                   <div className="flex text-pumpkin" key={item.id}>
    //                     {item.industry}
    //                   </div>
    //                 ))}
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <button
    //           className="justify-center font-bold"
    //           onClick={() => {
    //             void fetchNextPage()
    //           }}
    //           disabled={!hasNextPage || isFetchingNextPage}
    //         >
    //           Load More
    //         </button>
    //       </>
    //     ))}

    //   <Select
    //     text="sort by"
    //     options={{
    //       'Environment Grade': ['low to high', 'high to low'],
    //       'Net Asset Sum': ['low to high', 'high to low'],
    //     }}
    //     updateControl={{
    //       type: 'on-apply',
    //       cb: setSelectedSortKeys,
    //     }}
    //     isSearchable={true}
    //   />

    <div className="flex flex-col items-center">
      <HighlightedTitle
        title="Learn About Investments"
        size="large"
        color="clementine"
      />
      <SearchBar setCompanySearchQuery={setCompanySearchQuery} />
      {/* TODO: make blue bkgd stretch to the bottom when fewer resulsts too */}
      {resultsEmpty && (
        <p className="py-12 text-[22px] font-medium">
          No results found, try searching again.
        </p>
      )}
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
        ></LoadMoreButton>
        <ToTopButton />
      </div>
    </div>
  )
}

export default Home
