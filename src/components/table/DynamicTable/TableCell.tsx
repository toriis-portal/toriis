import clsx from 'classnames'
import { useState } from 'react'

import type {
  ColumnSelectCtrl,
  TableColumn,
  TableColumnCtrl,
  ColumnSelectCtrlExplicitOption,
  ColumnSelectCtrlOption,
  BaseTableRowGeneric,
  RowEntry,
} from './DynamicTable'

/**
 * Type guard for ColumnSelectCtrl
 *
 * @param ctrl - Column control to check
 * @returns True if the control is a ColumnSelectCtrl
 */
const isSelectOption = <TableRow,>(
  ctrl: TableColumnCtrl<TableRow>,
): ctrl is ColumnSelectCtrl<TableRow> =>
  (ctrl as ColumnSelectCtrl<TableRow>).options !== undefined

/**
 * Type guard for ColumnSelectCtrl with explicit options
 *
 * @param ctrl - Column control to check
 * @returns True if the control is a ColumnSelectCtrl with explicit options
 */
const isExplicitSelectOption = (
  option: ColumnSelectCtrlOption,
): option is ColumnSelectCtrlExplicitOption =>
  (option as ColumnSelectCtrlExplicitOption).label !== undefined

/**
 * Renders a select element for a column with a select control
 *
 * @note The select requires that the return value from the render function is the same as the value of the option
 *
 * @param row - Row to render
 * @param col - Column to render
 * @returns Select element
 */
const SelectEntry = <TableRow extends BaseTableRowGeneric<TableRow>>({
  row,
  col,
  onChange,
  onClick,
}: Props<TableRow>) => {
  if (!isSelectOption(col.ctrl)) {
    throw new Error('Invalid column type')
  }

  const [selected, setSelected] = useState(col.ctrl.render(row))

  const changedStyles = row.changedEntries.includes(col.key)
    ? 'bg-pumpkin/20'
    : ''
  const disabledStyles = !col.isEditable ? 'bg-gray-100' : ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == '') {
      return
    }
    if (typeof selected === 'number') {
      setSelected(Number(e.target.value))
      onChange?.(row, {
        key: col.key as Exclude<keyof TableRow, 'changedEntries'>,
        value: Number(e.target.value),
      })
      return
    }

    setSelected(e.target.value)
    onChange?.(row, {
      key: col.key as Exclude<keyof TableRow, 'changedEntries'>,
      value: e.target.value,
    })
  }

  return (
    <select
      className={clsx(
        col.ctrl.applyStyle?.(row),
        'w-full',
        changedStyles,
        disabledStyles,
      )}
      value={selected}
      disabled={!col.isEditable}
      onClick={(e) => {
        e.stopPropagation()

        if (col.isEditable) {
          onClick?.(row)
        }
      }}
      onChange={handleChange}
    >
      <option value="">{}</option>
      {col.ctrl.options.map((option) => (
        <option key={option.value} value={option.value}>
          {isExplicitSelectOption(option) ? option.label : option.value}
        </option>
      ))}
    </select>
  )
}

/**
 * Renders a text input for a column with a text control
 *
 * @param row - Row to render
 * @param col - Column to render
 * @returns Text input
 */
const TextEntry = <TableRow extends BaseTableRowGeneric<TableRow>>({
  row,
  col,
  onClick,
}: Props<TableRow>) => {
  if (col.ctrl.type !== 'text') {
    throw new Error('Invalid column type')
  }

  const changedStyles = row.changedEntries.includes(col.key)
    ? 'bg-pumpkin/20'
    : ''
  const disabledStyles = !col.isEditable ? 'bg-gray-100' : ''

  return (
    <input
      className={clsx(
        col.ctrl.applyStyle?.(row),
        'w-full',
        changedStyles,
        disabledStyles,
      )}
      type="text"
      value={col.ctrl.render(row)}
      disabled={!col.isEditable}
      onClick={(e) => {
        e.stopPropagation()

        if (col.isEditable) {
          onClick?.(row)
        }
      }}
      readOnly
    />
  )
}

const DateEntry = <TableRow extends BaseTableRowGeneric<TableRow>>({
  row,
  col,
  onClick,
}: Props<TableRow>) => {
  if (col.ctrl.type !== 'date') {
    throw new Error('Invalid column type')
  }
  const changedStyles = row.changedEntries.includes(col.key)
    ? 'bg-pumpkin/20'
    : ''
  const disabledStyles = !col.isEditable ? 'bg-gray-100' : ''

  return (
    <input
      className={clsx(
        col.ctrl.applyStyle?.(row),
        'w-full',
        changedStyles,
        disabledStyles,
      )}
      type="date"
      value={col.ctrl.render(row)}
      disabled={!col.isEditable}
      onClick={(e) => {
        e.stopPropagation()

        if (col.isEditable) {
          onClick?.(row)
        }
      }}
      readOnly
    />
  )
}

const NumberEntry = <TableRow extends BaseTableRowGeneric<TableRow>>({
  row,
  col,
  onClick,
}: Props<TableRow>) => {
  if (col.ctrl.type !== 'number') {
    throw new Error('Invalid column type')
  }

  const changedStyles = row.changedEntries.includes(col.key)
    ? 'bg-pumpkin/20'
    : ''
  const disabledStyles = !col.isEditable ? 'bg-gray-100' : ''

  return (
    <input
      className={clsx(
        col.ctrl.applyStyle?.(row),
        'w-full',
        changedStyles,
        disabledStyles,
      )}
      type="number"
      value={col.ctrl.render(row)}
      disabled={!col.isEditable}
      onClick={(e) => {
        e.stopPropagation()

        if (col.isEditable) {
          onClick?.(row)
        }
      }}
      readOnly
    />
  )
}
interface Props<TableRow extends BaseTableRowGeneric<TableRow>> {
  row: TableRow
  col: TableColumn<TableRow>
  onClick?: (row: TableRow) => void
  onChange?: (
    row: TableRow,
    updatedEntry: {
      key: keyof Omit<TableRow, 'changedEntries'>
      value: RowEntry
    },
  ) => void
}

/**
 * Renders a table entry according to the column control
 *
 * @note The select requires that the return value from the render function is the same as the value of the option
 *
 * @param row - Row to render
 * @param col - Column to render
 *
 * @returns Rendered table entry according to the column control
 */
export const TableCell = <TableRow extends BaseTableRowGeneric<TableRow>>(
  props: Props<TableRow>,
) => {
  const { row, col } = props

  if (col.ctrl.type === 'text') {
    return <TextEntry {...props} />
  } else if (col.ctrl.type === 'select') {
    return <SelectEntry {...props} />
  } else if (col.ctrl.type === 'date') {
    return <DateEntry {...props} />
  } else if (col.ctrl.type === 'number') {
    return <NumberEntry {...props} />
  }

  return <>{col.ctrl.render(row)}</>
}

export default TableCell
