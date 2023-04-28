import type { FC } from 'react'
import clsx from 'clsx'

const titleText: string[] = [
  'Transparent',
  'and',
  'Open',
  'Resource',
  'for',
  'Institutional',
  'Investments',
]

interface CapitalizedTitleProps {
  textSize?: string
  center?: boolean
  xSpacing?: string
  paddingTop?: string
}

const CapitalizedTitle: FC<CapitalizedTitleProps> = ({
  textSize = 'text-4xl',
  center = true,
  xSpacing = 'space-x-3',
  paddingTop = 'pt-10',
}) => {
  function isCapital(word: string) {
    return word.charAt(0) === word.charAt(0).toUpperCase()
  }
  const firstLetter = clsx(
    `${textSize} first-letter:font-black first-letter:text-clementine font-medium`,
  )
  const landingHeader = clsx(`${textSize} font-medium`)
  const centeredStyle = center ? 'place-content-center' : ''

  return (
    <>
      <div
        className={clsx('flex flex-wrap', centeredStyle, xSpacing, paddingTop)}
      >
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
