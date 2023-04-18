import { useEffect, useMemo, useState } from 'react'
import type { Company } from '@prisma/client'

import { api } from '../../utils/api'
import { INDUSTRIES } from '../../utils/constants'

import { DynamicTable, PaginatedDynamicTable } from './DynamicTable'

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
  const [skip, setSkip] = useState(0)
  const { data, isLoading } = api.company.getCompaniesBySkipTake.useQuery({
    skip: skip,
    take: 10,
  })

  const originalRows = useMemo(() => data?.items ?? [], [data?.items])
  const [rows, setRows] = useState<
    (Company & {
      changedEntries: (keyof Company)[]
    })[]
  >(() => originalRows.map((row) => ({ ...row, changedEntries: [] })))

  useEffect(() => {
    const cleanedRows = originalRows.map((row) => {
      return {
        ...row,
        changedEntries: [],
      }
    })
    setRows(cleanedRows)
  }, [data, isLoading, originalRows, setRows])

  // const originalRows = JSON.parse(JSON.stringify(data)) as typeof data
  const handleChange = (
    row: Company,
    updatedEntry: {
      key: keyof Company
      value: string | number
    },
  ) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((prevRow) => {
        if (prevRow.id === row.id) {
          // if the new data matches the data in copied, remove it from keys
          const updatedEntries = (
            originalRows
              ? originalRows.find(
                  (dataRow: { id: string }) => dataRow.id === row.id,
                )
              : []
          ) as Company | []

          if (
            updatedEntries &&
            !Array.isArray(updatedEntries) &&
            updatedEntries?.id &&
            updatedEntries[updatedEntry.key] === updatedEntry.value
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
  const industryKeyValue = INDUSTRIES.map((industry) => ({
    value: industry,
    label: industry,
  }))

  return (
    <PaginatedDynamicTable
      paginated={{
        page: skip / 10 + 1,
        pageCount: 10,
        onPageChange: (page) => setSkip((page - 1) * 10),
        rowCount: rows.length,
      }}
      rows={rows}
      styles={{
        table: 'w-full',
      }}
      columns={[
        {
          key: 'name',
          label: 'Name',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.name,
          },
        },
        {
          key: 'ticker',
          label: 'Ticker',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.ticker,
          },
        },
        {
          key: 'sector',
          label: 'Sector',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.sector,
          },
        },
        {
          key: 'industry',
          label: 'Industry',
          isEditable: true,
          ctrl: {
            type: 'select',
            options: industryKeyValue,
            render: (row) => row.industry,
          },
        },
        {
          key: 'description',
          label: 'Description',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.description,
          },
        },
        {
          key: 'netAssetVal',
          label: 'Net Asset Value',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.netAssetVal,
          },
        },
        {
          key: 'bloombergId',
          label: 'Bloomberg ID',
          isEditable: true,
          ctrl: {
            type: 'text',
            render: (row) => row.bloombergId,
          },
        },
      ]}
      onSelectChange={(row, updatedEntry) => handleChange(row, updatedEntry)}
    />
  )
}
