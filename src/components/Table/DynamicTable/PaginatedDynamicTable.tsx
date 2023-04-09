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
}

export const PaginatedDynamicTable = <
  TableRow extends BaseTableRowGeneric<TableRow>,
>({
  paginated,
  ...tableProps
}: Props<TableRow>) => {
  const { rowCount: _rowCount, pageCount, page, onPageChange } = paginated ?? {}

  return (
    <div className="w-96">
      <DynamicTable {...tableProps} />
      <div className="flex">
        <ChevronLeftIcon
          onClick={() => onPageChange(page - 1)}
          className="h-5 w-5"
        />
        <div className="flex">
          {page} / {pageCount}
        </div>
        <ChevronRightIcon
          onClick={() => onPageChange(page + 1)}
          className="h-5 w-5"
        />
      </div>
    </div>
  )
}
