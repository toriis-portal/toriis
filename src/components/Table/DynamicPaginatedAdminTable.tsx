import { useEffect, useMemo, useState } from 'react'
import type { Company, Dataset, Sector } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { api } from '../../utils/api'
import { INDUSTRIES } from '../../utils/constants'

import { DynamicTable, PaginatedDynamicTable } from './DynamicTable'
import type {
  BaseTableRowGeneric,
  Column,
  RowEntry,
} from './DynamicTable/DynamicTable'

const PAGE_SIZE = 20

interface GlobalStateEntry<TableRow> {
  key: keyof TableRow
  value: TableRowWithChangedEntries<TableRow>[keyof TableRow]
  id: string
  page: number
}

type TableRowWithChangedEntries<TableRow> = TableRow & {
  changedEntries: (keyof TableRow)[]
}

interface Props<TableRow> {
  dataset: Dataset
  originalRows: TableRow[]
  columns: Column<TableRow>[]
  skip: number
  setSkip: (skip: number) => void
}

export const DynamicPaginatedAdminTable = <
  TableRow extends BaseTableRowGeneric<TableRow>,
>({
  dataset,
  originalRows,
  columns,
  skip,
  setSkip,
}: Props<TableRow>) => {
  const [isSelect, setIsSelect] = useState(false)
  const [curColumn, setCurColumn] = useState<keyof TableRow>('id')
  const [curRow, setCurRow] = useState<TableRow | null>(null)
  const [textBoxContent, setTextBoxContent] = useState('')

  const [globalStateEntries, SetGlobalStateEntries] = useState<
    GlobalStateEntry<TableRow>[]
  >([])
  const { data: session, status } = useSession()

  const mutation = api.request.createRequest.useMutation()

  const [rows, setRows] =
    useState<TableRowWithChangedEntries<TableRow>[]>(originalRows)

  const capturePageChanges = (page: number) => {
    const newEntries = [] as GlobalStateEntry<TableRow>[]

    rows
      .filter((row) => row.changedEntries.length > 0)
      .forEach((row) => {
        row.changedEntries.forEach((key) => {
          newEntries.push({
            key: key,
            value: row[key],
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
  }

  const submitRequest = () => {
    const currentMergedChanges = capturePageChanges(skip / PAGE_SIZE + 1)
    mutation.mutate({
      dataset: dataset,
      updates: currentMergedChanges,
      status: 'PENDING',
      userId: session?.user.id ?? '',
      createdAt: new Date().toISOString(),
    })
  }

  // Persist changed data when moving through pages
  useEffect(() => {
    const newRows = originalRows.map((row) => {
      const globalStateEntry = globalStateEntries.filter(
        (entry) => entry.id === row.id && entry.page === skip / PAGE_SIZE + 1,
      )

      if (globalStateEntry) {
        const newRow: TableRowWithChangedEntries<TableRow> = {
          ...row,
          changedEntries: globalStateEntry.map((entry) => entry.key),
        }

        globalStateEntry.forEach(
          <K extends keyof TableRowWithChangedEntries<TableRow>>({
            key,
            value,
          }: {
            key: K
            value: TableRowWithChangedEntries<TableRow>[K]
          }) => {
            if (key in newRow) {
              newRow[key] = value
            }
          },
        )

        return newRow
      }
      return row
    })
    setRows(newRows)
  }, [skip, globalStateEntries, originalRows])

  const handleChange = (
    row: TableRow,
    updatedEntry: {
      key: keyof TableRow
      value: RowEntry
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
          ) as TableRow | []

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
          SetGlobalStateEntries(capturePageChanges(page))
        }
        rows={rows}
        styles={{
          table: 'w-full',
        }}
        columns={columns}
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
            handleChange(curRow, {
              key: curColumn,
              value: e.target.value as RowEntry,
            })
          }
        }}
      ></input>

      <button onClick={submitRequest}>Request changes</button>
    </>
  )
}
