import { useState } from 'react'

import { DynamicTable } from './DynamicTable'

const data = [
  {
    _id: '60a6b1b0f83366c134399f9c',
    companyId: {
      $oid: '6425af8bf83366c134399f9b',
    },
    rawName: 'ABBVIE INC 2.6% DUE 11-21-2024',
    coupon: 2.6,
    maturityDate: {
      $date: {
        $numberLong: '1732147200000',
      },
    },
    quantity: 1065000,
    costVal: 1135158.13,
    marketVal: 1030877.86,
    year: 2021,
  },
  /**
   * Paste one or more documents here
   */
  {
    _id: 'woooow',
    companyId: {
      $oid: '6425af8bf83366c134399f9b',
    },
    rawName: 'ABBVIE INC 2.95% DUE ',
    coupon: 2.95,
    maturityDate: {
      $date: {
        $numberLong: '1795219200000',
      },
    },
    quantity: 495000,
    costVal: 545836.8,
    marketVal: 469035.55,
    year: 2021,
  },
]

export const Test = () => {
  const [rows, setRows] = useState<
    ((typeof data)[0] & { changedEntries: (keyof (typeof data)[0])[] })[]
  >(() => data.map((row) => ({ ...row, changedEntries: [] })))

  const originalRows = JSON.parse(JSON.stringify(data)) as typeof data

  const handleChange = (
    row: (typeof data)[0],
    updatedEntry: {
      key: keyof (typeof data)[0]
      value: string | number
    },
  ) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((prevRow) => {
        if (prevRow._id === row._id) {
          // if the new data matches the data in copied, remove it from keys
          if (
            originalRows.find((dataRow) => dataRow._id === row._id)?.[
              updatedEntry.key
            ] === updatedEntry.value
          ) {
            return {
              ...prevRow,
              [updatedEntry.key]: updatedEntry.value,
              changedEntries: prevRow.changedEntries.filter(
                (key) => key !== updatedEntry.key,
              ),
            }
          }

          return {
            ...prevRow,
            [updatedEntry.key]: updatedEntry.value,
            changedEntries: [...prevRow.changedEntries, updatedEntry.key],
          }
        }

        return prevRow
      })

      return newRows
    })
  }

  return (
    <DynamicTable
      rows={rows}
      columns={[
        {
          key: 'companyId',
          label: 'Company ID',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.companyId.$oid,
          },
        },
        {
          key: 'year',
          label: 'Year',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.year,
          },
        },
        {
          key: 'coupon',
          label: 'Coupon',
          isEditable: true,
          ctrl: {
            type: 'select',
            options: [
              { value: 2.6, label: '2.6' },
              { value: 2.95, label: '2.95' },
            ],
            render: (row) => row.coupon,
          },
        },
      ]}
      onSelectChange={(row, updatedEntry) => handleChange(row, updatedEntry)}
    />
  )
}
