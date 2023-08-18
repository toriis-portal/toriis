import { useEffect, useState } from 'react'
import { RequestStatus, type Dataset } from '@prisma/client'
import { useSession } from 'next-auth/react'

import { api } from '../../utils/api'
import { SubmitRequestModal, PrimaryButton, Toast } from '../index'

import { PaginatedDynamicTable } from './DynamicTable'
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
  columns: Column<TableRow>[]
  originalRows: TableRow[]
  skip: number
  setSkip: (skip: number) => void
  rowCount: number
}

interface MutationInput {
  id: string
  key: string
  value: string | number | Date
}

const DynamicPaginatedAdminTable = <
  TableRow extends BaseTableRowGeneric<TableRow>,
>({
  dataset,
  originalRows,
  skip,
  setSkip,
  rowCount,
  ...tableProps
}: Props<TableRow>) => {
  const convertTypes = (
    entries: GlobalStateEntry<TableRow>[],
  ): MutationInput[] => {
    const convertedItems: MutationInput[] = []

    entries.forEach((entry) => {
      convertedItems.push({
        key: entry.key as string,
        id: entry.id,
        value: entry.value as string | number | Date,
      })
    })
    return convertedItems
  }
  const [curColumn, setCurColumn] = useState<keyof TableRow>('id')
  const [curRow, setCurRow] = useState<TableRow | null>(null)
  const [curType, setCurType] = useState<
    'text' | 'date' | 'number' | 'free' | 'select'
  >('text')
  const [textBoxContent, setTextBoxContent] = useState<string | number>('')
  const [modalOpen, setModalOpen] = useState(false)

  const [globalStateEntries, SetGlobalStateEntries] = useState<
    GlobalStateEntry<TableRow>[]
  >([])
  const { data: session, status: _status } = useSession()

  const mutation = api.request.createRequest.useMutation()

  const [rows, setRows] =
    useState<TableRowWithChangedEntries<TableRow>[]>(originalRows)

  // Collect all changes made for a specific page and add them to changed entries
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

  const submitRequest = (comment: string) => {
    const currentMergedChanges = capturePageChanges(skip / PAGE_SIZE + 1)
    mutation.mutate({
      dataset: dataset,
      updates: convertTypes(currentMergedChanges),
      status: RequestStatus.PENDING,
      userId: session?.user.id ?? '',
      comment: comment,
      createdAt: new Date().toISOString(),
    })
  }

  // Reset the entry changes when the table is changed
  useEffect(() => {
    SetGlobalStateEntries([])
  }, [dataset])

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
      value: RowEntry | Date
    },
  ) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((prevRow) => {
        if (prevRow.id === row.id) {
          // If the new data matches the data in copied, remove it from keys
          const updatedEntries = (
            originalRows
              ? originalRows.find(
                  (dataRow: { id: string }) => dataRow.id === row.id,
                )
              : []
          ) as TableRow | []

          // Handle removing the data that matches what it was previously
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
          pageCount: Math.ceil(rowCount / PAGE_SIZE),
          onPageChange: (page) => setSkip((page - 1) * PAGE_SIZE),
          rowCount: rowCount,
        }}
        capturePageChanges={(page) =>
          SetGlobalStateEntries(capturePageChanges(page))
        }
        rows={rows}
        styles={{
          table: 'w-full',
        }}
        onSelectChange={(row, updatedEntry) => handleChange(row, updatedEntry)}
        onRowEntryClick={(row, col) => {
          if (col.ctrl.type === 'date') {
            const isValidDate =
              row[col.key] && !isNaN(Date.parse(row[col.key]?.toString() ?? ''))
            const date = new Date(row[col.key]?.toString() ?? '')
            setTextBoxContent(
              (isValidDate ? date.toISOString().split('T')[0] : '') ?? '',
            )
          } else {
            setTextBoxContent(row[col.key]?.toString() ?? '')
          }
          setCurRow(row)
          setCurColumn(col.key)
          setCurType(col.ctrl.type)
        }}
        {...tableProps}
      />
      <div className="flex w-full flex-col items-center">
        <input
          value={textBoxContent}
          disabled={curType === 'select'}
          type={curType}
          onChange={(e) => {
            // Handle date input type
            if (curType === 'date' && curRow) {
              setTextBoxContent(e.target.value)
              const date = new Date(e.target.value)
              if (date.toString() !== 'Invalid Date') {
                handleChange(curRow, {
                  key: curColumn,
                  value: date,
                })
              }
            } else {
              setTextBoxContent(e.target.value)
              if (curRow) {
                const targetType = typeof curRow[curColumn]
                handleChange(curRow, {
                  key: curColumn,
                  value:
                    targetType === 'number'
                      ? Number(e.target.value)
                      : e.target.value,
                })
              }
            }
          }}
          className="my-2 w-full border-2 border-cobalt px-10 py-4"
        />
        <SubmitRequestModal
          isOpen={modalOpen}
          isOpenCallBack={setModalOpen}
          onSubmit={submitRequest}
        />
        <PrimaryButton
          text="Request Review"
          onClick={() => setModalOpen(true)}
        />
        {mutation.isSuccess && (
          <Toast type="success" message="Successfully submitted request!" />
        )}
        {mutation.isError && (
          <Toast
            type="error"
            message="Something went wrong, please try again."
          />
        )}
      </div>
    </>
  )
}

export default DynamicPaginatedAdminTable
