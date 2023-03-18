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
              className="hover:fill-gray-500"
              width="20px"
              height="20px"
            />
          </button>
          <button onClick={onClickDown}>
            <ChevronDownIcon
              className="hover:fill-gray-500"
              width="20px"
              height="20px"
            />
          </button>
        </div>
      </div>
    </>
  )
}

const InvestmentTable: FC<{ investments: Investment[] }> = ({
  investments,
}) => {
  const [sortBy, setSortBy] = useState<string[]>(['name', 'asc'])
  const [sortedInvestments, setSortedInvestments] =
    useState<Investment[]>(investments)

  useEffect(() => {
    const sortedCopy = [...investments]
    setSortedInvestments(
      sortedCopy.sort((a, b) => {
        switch (sortBy[0]) {
          case 'name':
            return sortBy[1] === 'asc'
              ? a.rawName.localeCompare(b.rawName)
              : b.rawName.localeCompare(a.rawName)
          case 'coupon':
            return sortBy[1] == 'asc'
              ? a.coupon - b.coupon
              : b.coupon - a.coupon
          case 'maturityDate':
            return sortBy[1] == 'asc'
              ? a.maturityDate.getTime() - b.maturityDate.getTime()
              : b.maturityDate.getTime() - a.maturityDate.getTime()
          case 'quantity':
            return sortBy[1] == 'asc'
              ? a.quantity - b.quantity
              : b.quantity - a.quantity
          case 'costVal':
            return sortBy[1] == 'asc'
              ? a.costVal - b.costVal
              : b.costVal - a.costVal
          case 'marketVal':
            return sortBy[1] == 'asc'
              ? a.marketVal - b.marketVal
              : b.marketVal - a.marketVal
          case 'year':
            return sortBy[1] == 'asc' ? a.year - b.year : b.year - a.year
        }
        return 0
      }),
    )
  }, [investments, sortBy])

  return (
    <table className="m-10 table-fixed border-2 border-clementine">
      <thead>
        <tr className="bg-clementine text-white">
          <th className="w-1/6">
            <ChevronFilter
              onClickUp={() => setSortBy(['name', 'asc'])}
              onClickDown={() => setSortBy(['name', 'desc'])}
              text="Investment"
            />
          </th>
          <th className="w-1/12 border-x-2 border-white">
            <ChevronFilter
              onClickUp={() => setSortBy(['coupon', 'asc'])}
              onClickDown={() => setSortBy(['coupon', 'desc'])}
              text="Coupon"
            />
          </th>
          <th className="w-1/6 border-x-2 border-white">
            <ChevronFilter
              onClickUp={() => setSortBy(['maturityDate', 'asc'])}
              onClickDown={() => setSortBy(['maturityDate', 'desc'])}
              text="Maturity Date"
            />
          </th>
          <th className="w-1/6 border-x-2 border-white">
            <ChevronFilter
              onClickUp={() => setSortBy(['quantity', 'asc'])}
              onClickDown={() => setSortBy(['quantity', 'desc'])}
              text="Quantity"
            />
          </th>
          <th className="w-1/6 border-x-2 border-white">
            <ChevronFilter
              onClickUp={() => setSortBy(['costVal', 'asc'])}
              onClickDown={() => setSortBy(['costVal', 'desc'])}
              text="Cost Value"
            />
          </th>
          <th className="w-1/6 border-x-2 border-white">
            <ChevronFilter
              onClickUp={() => setSortBy(['marketVal', 'asc'])}
              onClickDown={() => setSortBy(['marketVal', 'desc'])}
              text="Market Value"
            />
          </th>
          <th className="w-1/12">
            <ChevronFilter
              onClickUp={() => setSortBy(['year', 'asc'])}
              onClickDown={() => setSortBy(['year', 'desc'])}
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
              <td className="border-x-2 border-clementine text-center">
                {investment.coupon}
              </td>
              <td className="border-x-2 border-clementine text-center">
                {investment.maturityDate.toISOString()}
              </td>
              <td className="border-x-2 border-clementine text-center">
                {investment.quantity}
              </td>
              <td className="border-x-2 border-clementine text-center">
                {investment.costVal}
              </td>
              <td className="border-x-2 border-clementine text-center">
                {investment.marketVal}
              </td>
              <td className="border-x-2 border-clementine text-center">
                {investment.year}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default InvestmentTable
