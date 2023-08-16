import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Spinner } from 'flowbite-react'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { api } from '../../utils/api'

interface LetterProps {
  openLetter: Document
}

const OpenLetterConclusion: FC<LetterProps> = ({ openLetter }) => {
  return (
    <div className="flex flex-col items-center pb-24">
      <div className="space-y-6 px-12 lg:px-80">
        {documentToReactComponents(openLetter, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default OpenLetterConclusion
