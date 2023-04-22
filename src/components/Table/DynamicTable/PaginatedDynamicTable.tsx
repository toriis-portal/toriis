import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import DynamicTable from './DynamicTable'
import type { BaseTableRowGeneric, DynamicTableProps } from './DynamicTable'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rowCount: _rowCount, pageCount, page, onPageChange } = paginated ?? {}

  const handlePageChange = (page: number, changeBy: number) => {
    onPageChange(page + changeBy)
    capturePageChanges?.(page)
  }

  return (
    <div>
      <DynamicTable {...tableProps} />
      <div className="flex">
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
