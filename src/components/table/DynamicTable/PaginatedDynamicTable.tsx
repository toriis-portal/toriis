import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import type { BaseTableRowGeneric, DynamicTableProps } from './DynamicTable'
import { DynamicTable } from './DynamicTable'

/**
 * Paginated interface that describes the properties of a paginated table
 */
interface Paginated {
  rowCount: number
  pageCount: number
  page: number
  onPageChange: (page: number) => void
}

interface Props<TableRow> extends DynamicTableProps<TableRow> {
  paginated: Paginated
  capturePageChanges?: (page: number) => void
}

export const PaginatedDynamicTable = <
  TableRow extends BaseTableRowGeneric<TableRow>,
>({
  paginated,
  capturePageChanges,
  ...tableProps
}: Props<TableRow>) => {
  const { rowCount: _rowCount, pageCount, page, onPageChange } = paginated ?? {}

  const handlePageChange = (page: number, changeBy: number) => {
    if (page + changeBy > 0 && page + changeBy <= pageCount) {
      onPageChange(page + changeBy)
      capturePageChanges?.(page)
    }
  }

  return (
    <div>
      <DynamicTable {...tableProps} />
      <div className="flex w-full flex-row justify-center">
        <ChevronLeftIcon
          onClick={() => handlePageChange(page, -1)}
          className="h-5 w-5"
        />
        <div className="flex">
          {page} / {pageCount}
        </div>
        <ChevronRightIcon
          onClick={() => handlePageChange(page, 1)}
          className="h-5 w-5"
        />
      </div>
    </div>
  )
}

export default PaginatedDynamicTable
