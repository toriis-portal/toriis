import type { FC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import type { Investment } from '@prisma/client'
import clsx from 'clsx'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
interface ChevronFilterProps {
  text: string
  onClickUp: VoidFunction
  onClickDown: VoidFunction
}

type InvestmentSortAction = (
  a: Investment,
  b: Investment,
  isAscending: boolean,
) => number

interface InvestmentSortActions {
  rawName: InvestmentSortAction
  coupon: InvestmentSortAction
  maturityDate: InvestmentSortAction
  quantity: InvestmentSortAction
  costVal: InvestmentSortAction
  marketVal: InvestmentSortAction
  year: InvestmentSortAction
}

const ChevronFilter: FC<ChevronFilterProps> = ({
  text,
  onClickUp,
  onClickDown,
}) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
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

const tableHeaderMiddleStyle = clsx('w-1/12 border-x-2 border-white')
const tableRowStyle = clsx('border-x-2 border-clementine text-center')

const InvestmentTable: FC<{ investments: Investment[] }> = ({
  investments,
}) => {
  const [sortBy, setSortBy] = useState<[keyof InvestmentSortActions, boolean]>([
    'rawName',
    true,
  ])
  const [sortedInvestments, setSortedInvestments] =
    useState<Investment[]>(investments)

  useEffect(() => {
    const sortedCopy = [...investments]
    setSortedInvestments(
      sortedCopy.sort((a, b) => {
        const [sortKey, isAscending] = sortBy
        if (isAscending) {
          return a[sortKey] > b[sortKey] ? 1 : -1
        } else {
          return a[sortKey] > b[sortKey] ? -1 : 1
        }
      }),
    )
  }, [investments, sortBy])

  return (
    <table className="m-10 table-fixed border-2 border-clementine">
      <thead>
        <tr className="bg-clementine text-white">
          <th className="w-1/6">
            <ChevronFilter
              onClickUp={() => setSortBy(['rawName', true])}
              onClickDown={() => setSortBy(['rawName', false])}
              text="Investment"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => setSortBy(['coupon', true])}
              onClickDown={() => setSortBy(['coupon', false])}
              text="Coupon"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => setSortBy(['maturityDate', true])}
              onClickDown={() => setSortBy(['maturityDate', false])}
              text="Maturity Date"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => setSortBy(['quantity', true])}
              onClickDown={() => setSortBy(['quantity', false])}
              text="Quantity"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => setSortBy(['costVal', true])}
              onClickDown={() => setSortBy(['costVal', false])}
              text="Cost Value"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => setSortBy(['marketVal', true])}
              onClickDown={() => setSortBy(['marketVal', false])}
              text="Market Value"
            />
          </th>
          <th className="w-1/12">
            <ChevronFilter
              onClickUp={() => setSortBy(['year', true])}
              onClickDown={() => setSortBy(['year', false])}
              text="Year"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedInvestments.map((investment: Investment, index: number) => {
          return (
            <tr
              key={investment.id}
              className={clsx({ 'bg-lightClementine': index % 2 == 1 })}
            >
              <td className="p-4 text-center">{investment.rawName}</td>
              <td className={tableRowStyle}>{investment.coupon}</td>
              <td className={tableRowStyle}>
                {investment.maturityDate.toISOString()}
              </td>
              <td className={tableRowStyle}>{investment.quantity}</td>
              <td className={tableRowStyle}>{investment.costVal}</td>
              <td className={tableRowStyle}>{investment.marketVal}</td>
              <td className={tableRowStyle}>{investment.year}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default InvestmentTable
