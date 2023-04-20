import type { FC } from 'react'
import clsx from 'clsx'

import { fontOptions } from '../../utils/fontSizes'

const titleText: string[] = [
  'Transparent',
  'and',
  'Open',
  'Resource',
  'for',
  'Institutional',
  'Investments',
]

const CapitalizedTitle: FC = () => {
  function isCapital(word: string) {
    return word.charAt(0) === word.charAt(0).toUpperCase()
  }
  const firstLetter = clsx(
    fontOptions.h1,
    'first-letter:font-black first-letter:text-clementine',
  )
  const landingHeader = clsx(fontOptions.h1)
  return (
    <>
      <div className="flex flex-wrap place-content-center space-x-3 pt-10">
        {titleText.map((item, index) => (
          <span
            key={index}
            className={isCapital(item) ? firstLetter : landingHeader}
          >
            {item.endsWith('s') ? (
              <div>
                Investment
                <span className="text-clementine">s</span>
              </div>
            ) : (
              item
            )}
          </span>
        ))}
      </div>
    </>
  )
}

export default CapitalizedTitle
