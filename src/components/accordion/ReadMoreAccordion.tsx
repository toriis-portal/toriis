import clsx from 'clsx'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import React from 'react'

import { ReadMoreButton } from '../index'

interface ReadMoreAccordionProps {
  content?: string
  className?: string
  children?: React.ReactNode
  centerReadMoreButton?: boolean
}

const ReadMoreAccordion: FC<ReadMoreAccordionProps> = ({
  content = '',
  className,
  children,
  centerReadMoreButton = false,
}) => {
  const [folded, setFolded] = useState(true)

  // maxWordCount dynamically changes based on screen size
  const MOBILE_MAX_WORD_COUNT = 15
  const DESKTOP_MAX_WORD_COUNT = 75
  const [maxWordCount, setMaxWordCount] = useState(MOBILE_MAX_WORD_COUNT)

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth <= 768) {
        setMaxWordCount(MOBILE_MAX_WORD_COUNT)
        setIsMobile(true)
      } else {
        setMaxWordCount(DESKTOP_MAX_WORD_COUNT)
        setIsMobile(false)
      }
    }

    // Initial check
    updateIsMobile()

    // Add resize event listener
    window.addEventListener('resize', updateIsMobile)
    return () => {
      window.removeEventListener('resize', updateIsMobile)
    }
  }, [])

  let contentTruncated = content
  let childrenTruncated = children

  const shouldTruncate =
    (content && content.split(' ').length > maxWordCount) ||
    (children && React.Children.toArray(children).length > 1)

  if (children && shouldTruncate) {
    childrenTruncated = <div>{React.Children.toArray(children)[0]}</div>
  }

  if (content && shouldTruncate) {
    contentTruncated = content.split(' ').slice(0, maxWordCount).join(' ')
    contentTruncated += '...'
  }

  return (
    <div
      className={clsx(
        'w-full rounded-[10px] border-[3px] border-cobalt bg-lightBlue px-10 py-5',
        className,
      )}
    >
      {content && (
        <div className="mb-2">{folded ? contentTruncated : content}</div>
      )}
      {children && (
        <div className="mb-2 flex flex-col gap-3">
          {folded ? childrenTruncated : children}
        </div>
      )}
      <div
        className={`flex md:px-6 ${
          content ? (shouldTruncate ? '' : 'hidden') : ''
        } ${
          centerReadMoreButton
            ? 'justify-center'
            : 'justify-end md:justify-center'
        }`}
      >
        <ReadMoreButton
          isOpen={!folded}
          handleOpen={() => {
            setFolded(!folded)
          }}
        />
      </div>
    </div>
  )
}

export default ReadMoreAccordion
