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

const InvestmentTable: FC<{
  investments: Investment[]
  onSortChange: (sort: [keyof Investment, 'asc' | 'desc' | undefined]) => void
}> = ({ investments, onSortChange }) => {
  const handleSortChange = (
    newSort: [keyof Investment, 'asc' | 'desc' | undefined],
  ) => {
    onSortChange(newSort)
  }

  return (
    <table className="m-10 table-fixed border-2 border-clementine">
      <thead>
        <tr className="bg-clementine text-white">
          <th className="w-1/6">
            <ChevronFilter
              onClickUp={() => handleSortChange(['rawName', 'asc'])}
              onClickDown={() => handleSortChange(['rawName', 'desc'])}
              text="Investment"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => handleSortChange(['coupon', 'asc'])}
              onClickDown={() => handleSortChange(['coupon', 'desc'])}
              text="Coupon"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => handleSortChange(['maturityDate', 'asc'])}
              onClickDown={() => handleSortChange(['maturityDate', 'desc'])}
              text="Maturity Date"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => handleSortChange(['quantity', 'asc'])}
              onClickDown={() => handleSortChange(['quantity', 'desc'])}
              text="Quantity"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => handleSortChange(['costVal', 'asc'])}
              onClickDown={() => handleSortChange(['costVal', 'desc'])}
              text="Cost Value"
            />
          </th>
          <th className={tableHeaderMiddleStyle}>
            <ChevronFilter
              onClickUp={() => handleSortChange(['marketVal', 'asc'])}
              onClickDown={() => handleSortChange(['marketVal', 'desc'])}
              text="Market Value"
            />
          </th>
          <th className="w-1/12">
            <ChevronFilter
              onClickUp={() => handleSortChange(['year', 'asc'])}
              onClickDown={() => handleSortChange(['year', 'desc'])}
              text="Year"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {investments.map((investment: Investment, index: number) => {
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
