import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

type Options = string[] | Record<string, string[]>

interface SelectProps {
  text: string
  options: Options
  onClose?: () => void
  onOpen?: () => void
  onChange?: (value: string[]) => void
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
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      onClose?.()
    }
  }, [isOpen])

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
    onChange?.(currentSelected)
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
    onChange?.(currentSelected)
  }

  return (
    <div className="relative ml-10 w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="float-right flex h-10 w-fit items-center justify-center overflow-hidden rounded-full border  border-solid border-darkTeal"
      >
        <span className="mx-5 flex h-full w-fit items-center justify-center bg-white">
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
        <div className="absolute top-14 left-0 w-full rounded-md border-[0.5px] border-solid border-cobalt p-5 shadow-md">
          {isStringArray(options) ? (
            <ul className="flex flex-col gap-4">
              {options.map((option) => (
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
            <ul className="flex flex-col gap-5">
              {Object.entries(options).map(([key, value]) => (
                <li key={key} className="text-black">
                  <span className="text-xl">{key}</span>
                  <ul className="mt-2 flex flex-col gap-2">
                    {value.map((option) => (
                      <li key={option} className="flex items-center text-black">
                        <span>{option}</span>
                        <input
                          onChange={() => handleGroupChange(`${key}-${option}`)}
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
        </div>
      )}
    </div>
  )
}

export default Select
