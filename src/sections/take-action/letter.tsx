import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle } from '../../components'

interface LetterProps {
  openLetter: Document
}

const OpenLetter: FC<LetterProps> = ({ openLetter }) => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <HighlightedTitle
          title="An Open Letter"
          size="large"
          color="clementine"
        />
      </div>

      <div className="flex flex-row items-center">
        <p className="font-semibold">Join our</p>
        {/* TODO: get this number from contentful */}
        <p className="px-6 text-8xl font-bold">709</p>
        <p className="font-semibold">signatories</p>
      </div>
      <div className="space-y-4 px-60">
        {documentToReactComponents(openLetter, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default OpenLetter
