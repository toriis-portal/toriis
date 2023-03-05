import type { FC } from 'react'
import clsx from 'clsx'

const CapitalizedTitle: FC = () => {
  function isCapital(word: string) {
    return word.charAt(0) === word.charAt(0).toUpperCase()
  }
  const firstLetter = clsx(
    'text-4xl first-letter:font-black first-letter:text-[#FFA902] font-medium',
  )
  const landingHeader = clsx('text-4xl font-medium')
  const titleText: string[] = [
    'Transparent',
    'and',
    'Open',
    'Resource',
    'for',
    'Institutional',
    'Investment',
  ]
  return (
    <>
      <div className="flex flex-wrap place-content-center space-x-4 pt-10">
        {titleText.map((item, index) => (
          <span
            key={index}
            className={isCapital(item) ? firstLetter : landingHeader}
          >
            {' '}
            {item}{' '}
          </span>
        ))}
      </div>
    </>
  )
}

export default CapitalizedTitle
