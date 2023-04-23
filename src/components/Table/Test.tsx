import { useEffect, useMemo, useState } from 'react'
import type { Company, Sector } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { api } from '../../utils/api'
import { INDUSTRIES } from '../../utils/constants'

import { DynamicTable, PaginatedDynamicTable } from './DynamicTable'

const PAGE_SIZE = 20

interface GlobalStateEntry {
  key: keyof Company
  value: string | number | Sector
  id: string
  page: number
}

type CompanyWithChangedEntries = Company & { changedEntries: (keyof Company)[] }

export const Test = () => {
  const [skip, setSkip] = useState(0)
  const [isSelect, setIsSelect] = useState(false)
  const [curColumn, setCurColumn] = useState<keyof Company>('name')
  const [curRow, setCurRow] = useState<Company | null>(null)
  const [textBoxContent, setTextBoxContent] = useState('')
  const { data, isLoading } = api.company.getCompaniesBySkipTake.useQuery({
    skip: skip,
    take: PAGE_SIZE,
  })
  const [globalStateEntries, SetGlobalStateEntries] = useState<
    GlobalStateEntry[]
  >([])
  const { data: session, status } = useSession()

  const originalRows = useMemo(() => data?.items ?? [], [data?.items])
  const [rows, setRows] = useState<
    (Company & {
      changedEntries: (keyof Company)[]
    })[]
  >(() =>
    originalRows.map((row) => ({
      ...row,
      changedEntries: [],
    })),
  )

  const submitRequest = () =>
    api.request.createRequest.useQuery({
      dataset: 'Company',
      updates: globalStateEntries,
      status: 'PENDING',
      userId: session?.user.id ?? '',
      createdAt: new Date().toISOString(),
    })

  useEffect(() => {
    const cleanedRows = originalRows.map((row) => {
      return {
        ...row,
        changedEntries: [],
      }
    })
    setRows(cleanedRows)
  }, [data, isLoading, originalRows, setRows])

  // Persist changed data when moving through pages
  useEffect(() => {
    const initializeRows = originalRows.map((row) => ({
      ...row,
      changedEntries: [],
    }))
    const newRows = initializeRows.map((row) => {
      const globalStateEntry = globalStateEntries.filter(
        (entry) => entry.id === row.id && entry.page === skip / PAGE_SIZE + 1,
      )
      if (globalStateEntry) {
        const newRow: CompanyWithChangedEntries = {
          ...row,
          changedEntries: globalStateEntry.map((entry) => entry.key),
        }

        globalStateEntry.forEach((entry) => {
          if (entry.key in newRow) {
            // Hack to get around type check failure for newRow[entry.key] = entry.value
            switch (entry.key) {
              case 'id':
                newRow['id'] = entry.value as string
                break
              case 'name':
                newRow['name'] = entry.value as string
                break
              case 'ticker':
                newRow['ticker'] = entry.value as string
                break
              case 'sector':
                newRow['sector'] = entry.value as Sector
                break
              case 'industry':
                newRow['industry'] = entry.value as string
                break
              case 'netAssetVal':
                newRow['netAssetVal'] = entry.value as number
                break
              case 'description':
                newRow['description'] = entry.value as string
                break
              case 'bloombergId':
                newRow['bloombergId'] = entry.value as string
                break
            }
          }
        })

        return newRow
      }
      return row
    })
    setRows(newRows)
  }, [skip, globalStateEntries, originalRows])

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
            changedEntries: [
              ...new Set([...prevRow.changedEntries, ...[updatedEntry.key]]),
            ], // Union of two arrays
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
    <>
      <PaginatedDynamicTable
        paginated={{
          page: skip / PAGE_SIZE + 1,
          pageCount: 10, // TODO: Get this from the API
          onPageChange: (page) => setSkip((page - 1) * PAGE_SIZE),
          rowCount: rows.length,
        }}
        capturePageChanges={(page) =>
          SetGlobalStateEntries(() => {
            const newEntries = [] as GlobalStateEntry[]

            rows
              .filter((row) => row.changedEntries.length > 0)
              .forEach((row) => {
                row.changedEntries.forEach((key) => {
                  newEntries.push({
                    key: key,
                    value: row[key] ?? '',
                    id: row.id,
                    page: page,
                  })
                })
              })
            const mergedEntries = newEntries
            globalStateEntries.forEach((entry) => {
              const existingEntry = newEntries.find(
                (newEntry) =>
                  newEntry.id === entry.id &&
                  newEntry.page === entry.page &&
                  entry.key === newEntry.key,
              )
              if (!existingEntry) {
                mergedEntries.push(entry)
              }
            })
            return mergedEntries
          })
        }
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
              render: (row) => row.name ?? '',
            },
          },
          {
            key: 'ticker',
            label: 'Ticker',
            isEditable: true,
            ctrl: {
              type: 'text',
              render: (row) => row.ticker ?? '',
            },
          },
          {
            key: 'sector',
            label: 'Sector',
            isEditable: true,
            ctrl: {
              type: 'text',
              render: (row) => row.sector ?? '',
            },
          },
          {
            key: 'industry',
            label: 'Industry',
            isEditable: true,
            ctrl: {
              type: 'select',
              options: industryKeyValue,
              render: (row) => row.industry ?? '',
            },
          },
          {
            key: 'description',
            label: 'Description',
            isEditable: true,
            ctrl: {
              type: 'text',
              render: (row) => row.description ?? '',
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
              render: (row) => row.bloombergId ?? '',
            },
          },
        ]}
        onSelectChange={(row, updatedEntry) => handleChange(row, updatedEntry)}
        onRowEntryClick={(row, col) => {
          setTextBoxContent(row[col.key]?.toString() ?? '')
          if (col.ctrl.type !== 'text') {
            setIsSelect(true)
          } else {
            setIsSelect(false)
            setCurRow(row)
            setCurColumn(col.key)
          }
        }}
      />
      <input
        value={textBoxContent}
        disabled={isSelect}
        onChange={(e) => {
          setTextBoxContent(e.target.value)
          if (curRow) {
            handleChange(curRow, { key: curColumn, value: e.target.value })
          }
        }}
      ></input>

      <button onClick={submitRequest}>Request changes</button>
    </>
  )
}
