import clsx from 'classnames'
import type { ReactNode } from 'react'

import { TableCell } from './TableCell'

// Describes the type of key-value, value types that can be in the table data passed in
export type RowEntry = string | number

interface BaseColumnCtrl<TableRow> {
  applyStyle?: (row: TableRow) => string
}

/**
 * Column Text interface that describes the properties of a text column for the DynamicTable
 */
interface ColumnTextCtrl<TableRow> extends BaseColumnCtrl<TableRow> {
  type: 'text'
  render: (row: TableRow) => RowEntry
}
export type TableColumnTextCtrl<TableRow> = ColumnTextCtrl<TableRow>

/**
 * Column Select interface that describes the properties of a select column for the DynamicTable
 */
export interface ColumnSelectCtrlInferredOption {
  value: RowEntry
}

/**
 * Column Select interface that describes the properties of the options of a select.
 * This allows the user to specify the value and label of the option dropdown
 */
export interface ColumnSelectCtrlExplicitOption {
  value: RowEntry
  label: string
}

export type ColumnSelectCtrlOption =
  | ColumnSelectCtrlInferredOption
  | ColumnSelectCtrlExplicitOption

/**
 * Column Select interface that describes the properties of a select column for the DynamicTable
 */
export interface ColumnSelectCtrl<TableRow> extends BaseColumnCtrl<TableRow> {
  type: 'select'
  options: ColumnSelectCtrlOption[]
  render: (row: TableRow) => RowEntry
}

/**
 * Column Free interface that describes the properties of a free column for the DynamicTable.
 * Allows the user to render any ReactNode in the table from the interfaced component
 */
export interface ColumnFreeCtrl<TableRow> extends BaseColumnCtrl<TableRow> {
  type: 'free'
  render: (row: TableRow) => ReactNode
  applyStyle: never
}

export type TableColumnCtrl<TableRow> =
  | ColumnTextCtrl<TableRow>
  | ColumnSelectCtrl<TableRow>
  | ColumnFreeCtrl<TableRow>

/**
 * Generic Column interface that describes the properties of a column for the DynamicTable
 */
export interface Column<TableRow> {
  key: keyof TableRow
  label: string
  headerClassName?: string
  cellClassName?: string
  isSortable?: boolean
  isEditable?: boolean
  ctrl: TableColumnCtrl<TableRow>
}
export type TableColumn<TableRow> = Column<TableRow>

// TODO: Add styling
const BASE_TABLE_STYLES = {
  table: 'table',
  header: 'table-header',
  body: 'table-body',
  row: 'table-row',
}

interface TableStyles {
  table?: string
  header?: string
  body?: string
  row?: string
}

/**
 * Customizable props of the dynamic component that user interfaces with to edit table
 */
interface Props<TableRow> {
  rows: TableRow[]
  columns: Column<TableRow>[]
  styles?: TableStyles
  onRowEntryClick?: (row: TableRow, col: Column<TableRow>) => void
  onSelectChange?: (
    row: TableRow,
    updatedEntry: {
      key: keyof TableRow
      value: RowEntry
    },
  ) => void
}

export type DynamicTableProps<TableRow> = Props<TableRow>

export interface BaseTableRowGeneric<TableRow> {
  id: string
  changedEntries: (keyof TableRow)[]
}

/**
 * A highly customizable table component that allows for dynamic columns and rows
 *
 * @param isPaginated - Whether the table should be paginated
 * @param rows - The rows of the table
 * @param columns - The columns of the table
 * @param styles - The styles of the table which includes the table, header, body, and footer
 * @returns A highly customizable table component that allows for dynamic columns and rows
 *
 * @example
 * const columns: TableColumn<TableRow>[] = [
  {
    key: 'name',
    label: 'Name',
    isSortable: true,
    isEditable: true,
    ctrl: {
      type: 'text',
      text: 'John Doe',
      render: (row) => row.name,
    },
  },
  {
    key: 'age',
    label: 'Age',
    isSortable: true,
    isEditable: true,
    ctrl: {
      type: 'select',
      options: [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
      render: (row) => row.age,
    },
  }
];

const rows: TableRow[] = [
  {
    name: 'John Doe',
    age: 0,
  },
  {
    name: 'Jane Doe',
    age: 1,
  },
];

<DynamicTable rows={rows} columns={columns} />
 */
export const DynamicTable = <TableRow extends BaseTableRowGeneric<TableRow>>({
  rows,
  columns,
  styles,
  onRowEntryClick,
  onSelectChange,
}: Props<TableRow>) => {
  // Deconstruct components props
  const {
    table: tableStyles,
    header: headerStyles,
    body: bodyStyles,
    row: rowStyles,
  } = styles ?? {}

  const STYLES = {
    table: clsx(BASE_TABLE_STYLES.table, tableStyles),
    header: clsx(BASE_TABLE_STYLES.header, headerStyles),
    body: clsx(BASE_TABLE_STYLES.body, bodyStyles),
    row: clsx(BASE_TABLE_STYLES.row, rowStyles),
  }

  return (
    <table className={STYLES.table}>
      <thead className={STYLES.header}>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className={col.headerClassName}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={STYLES.body}>
        {rows.map((row) => (
          <tr key={row.id} className={STYLES.row}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                aria-disabled={!col.isEditable}
                className={clsx(col.cellClassName, 'p-2')}
              >
                <TableCell
                  row={row}
                  col={col}
                  onClick={() => onRowEntryClick && onRowEntryClick(row, col)}
                  onChange={onSelectChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DynamicTable
