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
  const { isLoading } = api.signatory.getSignatoriesCount.useQuery()
  if (isLoading) {
    return (
      <div className="flex flex-col items-center px-12">
        <Spinner color="info" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-2/4 space-y-6">
        {documentToReactComponents(openLetter, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default OpenLetterConclusion
