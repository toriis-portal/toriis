import clsx from 'clsx'
import type { FC } from 'react'
import { useState } from 'react'

import { ReadMoreButton } from '../index'

interface CompanyDetailsAccordionProps {
  content: string
  className?: string
}

const CompanyDetailsAccordion: FC<CompanyDetailsAccordionProps> = ({
  content,
  className,
}) => {
  const [folded, setFolded] = useState(true)

  const maxWordCount = 75

  let truncated = content

  const contentSplit = content.split(' ')
  const contentLengthTooLong = contentSplit.length > maxWordCount
  if (contentLengthTooLong) {
    truncated = contentSplit.slice(0, maxWordCount).join(' ')
    truncated += '...'
  }

  return (
    <div
      className={clsx(
        'bb rounded-[10px] border-[3px] border-cobalt bg-lightBlue px-10 py-5',
        className,
      )}
    >
      <p>{folded ? truncated : content}</p>
      <div className={`flex px-6 ${contentLengthTooLong ? '' : 'hidden'}`}>
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

export default CompanyDetailsAccordion
