import type { FC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import type { Investment } from '@prisma/client'
import clsx from 'clsx'
import { Spinner } from 'flowbite-react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

import { api } from '../../utils/api'
import LoadMoreButton from '../Buttons/LoadMoreButton'
interface ChevronFilterProps {
  text: string
  onClickUp: VoidFunction
  onClickDown: VoidFunction
}

const ChevronFilter: FC<ChevronFilterProps> = ({
  text,
  onClickUp,
  onClickDown,
}) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center gap-1">
        <p className="mx-2 my-auto max-w-fit text-white">{text}</p>
        <div className="flex flex-col">
          <button onClick={onClickUp}>
            <ChevronUpIcon
              className="stroke-current stroke-1 hover:fill-gray-500"
              width="20px"
              height="20px"
            />
          </button>
          <button onClick={onClickDown}>
            <ChevronDownIcon
              className="stroke-current stroke-1 hover:fill-gray-500"
              width="20px"
              height="20px"
            />
          </button>
        </div>
      </div>
    </>
  )
}

const tableHeaderMiddleStyle = clsx('border-x-2 min-w-10 border-white p-3')
const tableRowStyle = clsx(
  'border-x-2 border-clementine text-center p-4 min-w-[8rem] truncate',
)

const InvestmentTable: FC<{ companyId: string }> = (companyId) => {
  const [selectedSort, setSelectedSort] = useState<
    [keyof Investment, 'asc' | 'desc' | undefined]
  >(['rawName', undefined])
  const limit = 5
  const {
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
  } = api.company.getInvestmentByCompany.useInfiniteQuery(
    {
      limit: limit,
      companyId: companyId.companyId,
      sortKey: selectedSort[0],
      sortOrder: selectedSort[1],
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
  }, [refetch, selectedSort])

  if (!data || isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="overflow-x-scroll">
      <table className="m-10 table-fixed border-2 border-clementine">
        <thead>
          <tr className="bg-clementine text-white">
            <th>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['rawName', 'asc'])}
                onClickDown={() => setSelectedSort(['rawName', 'desc'])}
                text="Investment"
              />
            </th>
            <th className={tableHeaderMiddleStyle}>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['coupon', 'asc'])}
                onClickDown={() => setSelectedSort(['coupon', 'desc'])}
                text="Coupon"
              />
            </th>
            <th className={tableHeaderMiddleStyle}>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['maturityDate', 'asc'])}
                onClickDown={() => setSelectedSort(['maturityDate', 'desc'])}
                text="Maturity Date"
              />
            </th>
            <th className={tableHeaderMiddleStyle}>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['quantity', 'asc'])}
                onClickDown={() => setSelectedSort(['quantity', 'desc'])}
                text="Quantity"
              />
            </th>
            <th className={tableHeaderMiddleStyle}>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['costVal', 'asc'])}
                onClickDown={() => setSelectedSort(['costVal', 'desc'])}
                text="Cost Value"
              />
            </th>
            <th className={tableHeaderMiddleStyle}>
              <ChevronFilter
                onClickUp={() => setSelectedSort(['marketVal', 'asc'])}
                onClickDown={() => setSelectedSort(['marketVal', 'desc'])}
                text="Market Value"
              />
            </th>
            <th className="w-1/12">
              <ChevronFilter
                onClickUp={() => setSelectedSort(['year', 'asc'])}
                onClickDown={() => setSelectedSort(['year', 'desc'])}
                text="Year"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page, pageIndex) => {
            return page.items.map((item, itemIndex) => {
              return (
                <tr
                  key={item.id}
                  className={clsx({
                    'bg-lightClementine': (pageIndex + itemIndex) % 2 == 1,
                  })}
                >
                  <td className={tableRowStyle}>{item.rawName}</td>
                  <td className={tableRowStyle}>{item.coupon}</td>
                  <td className={tableRowStyle}>
                    {item.maturityDate.toLocaleDateString()}
                  </td>
                  <td className={tableRowStyle}>{item.quantity}</td>
                  <td className={tableRowStyle}>{item.costVal}</td>
                  <td className={tableRowStyle}>{item.marketVal}</td>
                  <td className={tableRowStyle}>{item.year}</td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
      <div className="text-center">
        <LoadMoreButton
          onClick={() => {
            void fetchNextPage()
          }}
          disabled={!hasNextPage || isFetchingNextPage}
        ></LoadMoreButton>
      </div>
    </div>
  )
}

export default InvestmentTable
