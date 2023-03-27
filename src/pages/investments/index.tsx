import { useEffect, useState } from 'react'
import type { FC } from 'react'

import { Select, HighlightedTitle, SearchBar } from '../../components'
import { api } from '../../utils/api'

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
      companyName: companySearchQuery,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  )

  const dataExists =
    data != undefined && data.pages != undefined && data.pages[0] != undefined

  useEffect(() => {
    const refetchData = async () => {
      await refetch()
    }

    refetchData().catch((err) => {
      console.error(err)
    })
  }, [selectedSortKeys])

  return (
    <div className="flex flex-col items-center">
      <HighlightedTitle
        title="Learn About Investments"
        size="large"
        color="clementine"
      />

      <SearchBar setCompanySearchQuery={setCompanySearchQuery} />

      {isLoading && <p className="py-12 text-[22px] font-medium">(loading)</p>}

      {dataExists &&
        (data?.pages[0]?.items?.length < 1 ? (
          <p className="py-12 text-[22px] font-medium">
            No results found, try searching again.
          </p>
        ) : (
          <>
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
          </>
        ))}

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
  )
}

export default Home
