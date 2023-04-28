import clsx from 'clsx'
import type { FC } from 'react'
import { useState } from 'react'
import React from 'react'

import { ReadMoreButton } from '../index'

interface ReadMoreAccordionProps {
  content?: string
  className?: string
  children?: React.ReactNode
}

const ReadMoreAccordion: FC<ReadMoreAccordionProps> = ({
  content = '',
  className,
  children,
}) => {
  const [folded, setFolded] = useState(true)

  const maxWordCount = 75

  let truncated = content
  let children_truncated = null

  const contentSplit = content.split(' ')
  let contentLengthTooLong = contentSplit.length > maxWordCount

  if (children && folded) {
    contentLengthTooLong = true
    children_truncated = <div>{React.Children.toArray(children)[0]}</div>
  }

  if (contentLengthTooLong) {
    truncated = contentSplit.slice(0, maxWordCount).join(' ')
    truncated += '...'
  }

  return (
    <div
      className={clsx(
        'w-full rounded-[10px] border-[3px] border-cobalt bg-lightBlue px-10 py-5',
        className,
      )}
    >
      {content && <div className="mb-2">{folded ? truncated : content}</div>}
      {children && (
        <div className="mb-2">{folded ? children_truncated : children}</div>
      )}
      <div
        className={`flex px-6 ${
          content ? (contentLengthTooLong ? '' : 'hidden') : ''
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
