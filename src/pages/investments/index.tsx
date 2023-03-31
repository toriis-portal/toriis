import { useEffect, useState } from 'react'
import type { FC } from 'react'
import React from 'react'
import type { Company, EnvGrade } from '@prisma/client'
import { Spinner } from 'flowbite-react'

import { Select, ToTopButton, PrimaryNavBar } from '../../components'
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
    <>
      <PrimaryNavBar />
      <div className="flex w-[95vw] flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue pb-20 xl:w-11/12">
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
    </>
  )
}

export default Home
