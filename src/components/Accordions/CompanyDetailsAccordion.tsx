import type { FC } from 'react'
import { useState } from 'react'

import { ReadMoreButton } from '../index'

interface CompanyDetailsAccordionProps {
  content: string
}

const CompanyDetailsAccordion: FC<CompanyDetailsAccordionProps> = ({
  content,
}) => {
  const [folded, setFolded] = useState(true)

  // TODO: make this dependent on width still...
  const maxWordCount = 75

  let truncated = content
  if ((truncated.match(/ /g) || []).length > maxWordCount) {
    truncated = content.split(' ').slice(0, maxWordCount).join(' ')
    truncated += '...'
    console.log('truncated to ', truncated)
  }

  return (
    <div className="mb-10 rounded-[10px] border-[3px]  border-cobalt bg-lightBlue px-10 py-5">
      <p>{folded ? truncated : content}</p>
      <div className="flex px-6">
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
