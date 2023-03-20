import { useEffect, useState } from 'react'
import type { FC } from 'react'
import React from 'react'
import type { Company, EnvGrade } from '@prisma/client'

import { Select } from '../../components'
import { api } from '../../utils/api'
import { CardProps } from '../../components/Card/CompanyCard'
import CompanyCard from '../../components/Card/CompanyCard'

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
    <div className="flex w-11/12 flex-col items-center gap-5 self-center rounded-t-xl bg-lightBlue">
      <div className="flex flex-row items-center justify-between self-stretch px-[50px] pt-[36px]">
        <div className="flex flex-row items-center gap-3.5">
          <p className="text-[32px] font-medium">Recommendations</p>
          <p className="text-[#626161]">
            {'('}
            {data?.pages ? data.pages.length * 5 : 0}
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
      <h2>{isLoading && '(loading)'}</h2>
      {data?.pages.map((page, idx) => {
        return (
          <div key={idx} className="flex w-3/4 flex-col gap-5">
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

      <button
        className="justify-center font-bold"
        onClick={() => {
          void fetchNextPage()
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load More
      </button>
    </div>
  )
}

export default Home
