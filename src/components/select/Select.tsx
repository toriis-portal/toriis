import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import { useClickedOutside, useMediaBreakPoint } from '../../utils/hooks'

type Options = string[] | Record<string, string[]>

interface SelectProps {
  text: string
  options: Options
  onClose?: () => void
  onOpen?: () => void
  updateControl: {
    type: 'on-change' | 'on-apply'
    cb: (value: string[]) => void
  }
  isSearchable?: boolean
  isFilter?: boolean
  containerHeight?: string // Only handles 1/4, 1/2, 3/4
  shortText?: string
  shouldClearChecked: boolean
}

/**
 * Type narrows the options to a string array
 *
 * @param options The options to check
 * @returns true if the options are a string array, false otherwise
 */
const isStringArray = (options: Options): options is string[] =>
  Array.isArray(options)

const SelectChevron: FC<{ isFilter: boolean; isOpen: boolean }> = ({
  isFilter,
  isOpen,
}) => {
  return (
    <span
      className={clsx(
        'flex h-full items-center justify-center',
        {
          'bg-lightBlue': isFilter,
          'bg-black': !isFilter,
        },
        {
          '-rotate-90': isFilter,
        },
        {
          'px-3': !isFilter,
          'px-0': isFilter,
        },
      )}
    >
      <ChevronDownIcon
        className={clsx(
          'ease h-5 w-5 transform duration-300',
          {
            'rotate-180': isOpen && !isFilter,
            'rotate-90': isOpen && isFilter,
          },
          {
            'fill-white stroke-white': !isFilter,
            'fill-black stroke-black': isFilter,
          },
        )}
      />
    </span>
  )
}

export const Select: FC<SelectProps> = ({
  text,
  onClose,
  onOpen,
  updateControl,
  options,
  isSearchable = false,
  isFilter = false,
  containerHeight,
  shortText,
  shouldClearChecked,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [textOption, setTextOption] = useState<string>(text)

  const ref = useRef<HTMLDivElement>(null)

  useClickedOutside(ref, () => {
    isOpen && setIsOpen(false)
  })

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
      setSearchQuery('')
    }
  }, [isOpen, onOpen])

  useEffect(() => {
    if (!isOpen) {
      onClose?.()
      setSearchQuery('')
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (updateControl.type === 'on-change' && shouldClearChecked) {
      setSelected([])
    }
  }, [shouldClearChecked, updateControl.type])

  useMediaBreakPoint(
    1000,
    () => {
      shortText && setTextOption(shortText)
    },
    () => {
      setTextOption(text)
    },
  )

  /**
   * Updates the selected state and calls the onChange callback
   *
   * @param e The event object
   */
  const handleChange = (option: string) => {
    let currentSelected = [...selected]

    if (selected.includes(option)) {
      currentSelected = currentSelected.filter((item) => item !== option)
    } else {
      currentSelected.push(option)
    }

    setSelected(currentSelected)

    if (updateControl.type === 'on-change') {
      updateControl.cb(currentSelected)
    }
  }

  /**
   * Updates the selected state and only allows 1 option to be selected from each key group
   *
   * @param option The option to select in the form of key-value
   */
  const handleGroupChange = (option: string) => {
    let currentSelected = [...selected]

    const [key, _value] = option.split('-')

    if (selected.includes(option)) {
      currentSelected = currentSelected.filter((item) => item !== option)
    } else if (selected.some((item) => item.split('-')[0] === key)) {
      currentSelected = currentSelected.filter(
        (item) => item.split('-')[0] !== key,
      )
      currentSelected.push(option)
    } else {
      currentSelected.push(option)
    }

    setSelected(currentSelected)

    if (updateControl.type === 'on-change') {
      updateControl.cb(currentSelected)
    }
  }

  /**
   * Called when the apply option is clicked and validates whether this dropdown should trigger
   */
  const handleApply = () => {
    if (updateControl.type !== 'on-apply') {
      return
    }
    updateControl.cb(selected)
  }

  /**
   * Determines whether a value should be in the filter or not
   *
   * @param value The value in consideration
   * @returns true if value includes searchQuery or searchQuery is empty, else false
   */
  const handleSearchFilter = (value: string) =>
    searchQuery !== ''
      ? value.toLowerCase().includes(searchQuery.toLowerCase())
      : true

  return (
    <div
      ref={updateControl.type == 'on-change' ? ref : null}
      className={clsx('relative', {
        'flex-grow basis-0': isFilter,
      })}
    >
      {/* Select Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex w-full items-center overflow-hidden rounded-full border border-solid',
          {
            'justify-centerborder-darkTeal float-right h-10 w-fit border-black':
              !isFilter,
            'h-8 border-cobalt': isFilter,
          },
        )}
      >
        <span
          className={clsx(
            'flex h-full w-fit flex-initial items-center justify-center bg-white px-5',
            { 'basis-1/4': isFilter },
          )}
        >
          <span
            className={clsx('w-full text-black', {
              'overflow-hidden whitespace-nowrap': isFilter,
            })}
          >
            {textOption}
          </span>
        </span>
        <div className={clsx({ 'basis-1/2': isFilter })} />
        <span
          className={clsx(
            'float-right h-full basis-1/4 items-center justify-center px-3',
            {
              'bg-lightBlue': isFilter,
              'bg-black': !isFilter,
            },
          )}
        >
          <SelectChevron isFilter={isFilter} isOpen={isOpen} />
        </span>
      </button>
      {/* Dropdown */}
      {isOpen && (
        <div
          className={clsx(
            'absolute left-0 z-10 transform rounded-md border-[0.5px] border-solid border-cobalt bg-white  shadow-md',
            {
              'w-60 -translate-x-20 translate-y-14 p-5': !isFilter,
              'w-full translate-y-2 p-4': isFilter,
            },
          )}
        >
          {isSearchable && (
            <div className="relative mb-5">
              <input
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                type="text"
                className={clsx(
                  'border-width-1 relative h-7 w-full rounded border border-solid border-black px-3 py-1 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-400',
                )}
                placeholder="Search"
              />
              <MagnifyingGlassIcon className="absolute top-1.5 left-2 h-4 w-4 fill-darkGray" />
            </div>
          )}
          <div
            className={clsx('overflow-y-auto overflow-x-visible p-0', {
              'max-h-fit': !containerHeight,
              'max-h-1/4': containerHeight == '1/4',
              'max-h-1/2': containerHeight == '1/2',
              'max-h-3/4': containerHeight == '3/4',
            })}
          >
            {isStringArray(options) ? (
              <ul
                className={clsx('m-auto flex w-5/6 flex-col', {
                  'gap-4': !isFilter,
                  'gap-1': isFilter,
                })}
              >
                {options.filter(handleSearchFilter).map((option) => (
                  <li
                    key={option}
                    className="mt-1 flex items-center text-black"
                  >
                    <span className={clsx({ 'body-small': isFilter })}>
                      {option}
                    </span>
                    <input
                      onChange={() => handleChange(option)}
                      type="checkbox"
                      className="ml-[auto] scale-125"
                      checked={selected.includes(option)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="m-auto flex w-11/12 flex-col gap-5">
                {Object.entries(options).map(([key, value]) => (
                  <li key={key} className="text-black">
                    <span>{key}</span>
                    <ul className="mt-2 flex flex-col gap-2">
                      {value.filter(handleSearchFilter).map((option) => (
                        <li
                          key={option}
                          className="flex items-center text-black"
                        >
                          <span className="body-small">{option}</span>
                          <input
                            onChange={() =>
                              handleGroupChange(`${key}-${option}`)
                            }
                            type="checkbox"
                            className="ml-[auto] scale-125"
                            checked={selected.includes(`${key}-${option}`)}
                          />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
            {updateControl.type === 'on-apply' && (
              <button
                className="body-normal m-[auto] mt-5 flex w-9/12 justify-center rounded-full bg-black text-white"
                onClick={handleApply}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Select
