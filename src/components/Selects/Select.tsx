import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'

type Options = string[] | Record<string, string[]>

interface SelectProps {
  text: string
  options: Options
  onClose?: () => void
  onOpen?: () => void
  // onChange?: (value: string[]) => void
  // type?: 'on-change' | 'on-apply'
  updateControl?: {
    type: 'on-change' | 'on-apply'
    cb: (value: string[]) => void
  }
  isSearchable?: boolean
  containerHeight?: string
}

/**
 * Type narrows the options to a string array
 *
 * @param options The options to check
 * @returns true if the options are a string array, false otherwise
 */
const isStringArray = (options: Options): options is string[] =>
  Array.isArray(options)

export const Select: FC<SelectProps> = ({
  text,
  onClose,
  onOpen,
  updateControl,
  options,
  isSearchable = false,
  containerHeight,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    }
  }, [isOpen, onOpen])

  useEffect(() => {
    if (!isOpen) {
      onClose?.()
    }
  }, [isOpen, onClose])

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

    if (updateControl?.type === 'on-change') {
      updateControl?.cb(currentSelected)
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

    if (updateControl?.type === 'on-change') {
      updateControl?.cb(currentSelected)
    }
  }

  /**
   * Called when the apply option is clicked and validates whether this dropdown should trigger
   */
  const handleApply = () => {
    if (updateControl?.type !== 'on-apply') {
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
    searchQuery !== '' ? value.includes(searchQuery) : true

  return (
    <div className="relative w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="float-right flex h-10 w-fit items-center justify-center overflow-hidden rounded-full border border-solid border-darkTeal"
      >
        <span className="flex h-full w-fit items-center justify-center bg-white px-5">
          <span className="text-black">{text}</span>
        </span>
        <span className="flex h-full items-center justify-center bg-black px-3">
          <ChevronDownIcon
            className={`ease h-5 w-5 transform fill-white stroke-white duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 w-full rounded-md border-[0.5px] border-solid border-cobalt bg-white p-5 shadow-md">
          {isSearchable && (
            <div className="relative mb-5">
              <input
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                type="text"
                className="relative h-7 w-full border border-solid border-black px-3 py-1 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search..."
              />
              <MagnifyingGlassIcon className="absolute top-1.5 left-2 h-4 w-4" />
            </div>
          )}
          <div
            className={`${
              containerHeight ? `max-h-[${containerHeight}]` : 'max-h-fit'
            } w-full overflow-x-visible overflow-y-scroll p-0`}
          >
            {isStringArray(options) ? (
              <ul className="m-auto flex w-11/12 flex-col gap-4">
                {options.filter(handleSearchFilter).map((option) => (
                  <li key={option} className="flex items-center text-black">
                    <span>{option}</span>
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
                    <span className="text-xl">{key}</span>
                    <ul className="mt-2 flex flex-col gap-2">
                      {value.filter(handleSearchFilter).map((option) => (
                        <li
                          key={option}
                          className="flex items-center text-black"
                        >
                          <span>{option}</span>
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
            {updateControl?.type === 'on-apply' && (
              <button
                className="m-[auto] mt-5 flex w-9/12 justify-center rounded-full bg-black text-sm text-white"
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
