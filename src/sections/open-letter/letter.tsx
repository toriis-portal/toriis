import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import type { TakeActionPage } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle } from '../../components'

interface LetterProps {
  takeActionPageEntries: TakeActionPage
}

const Letter: FC<LetterProps> = ({ takeActionPageEntries }) => {
  return (
    <div className="flex flex-col justify-center">
      {/* TODO: fix page centering */}
      <div className="flex justify-center px-80">
        <HighlightedTitle
          title="An Open Letter"
          size="large"
          color="clementine"
        />
        <div className="flex flex-row">
          <p>Join our</p>
          {/* TODO: get this number from contentful */}
          <p>709</p>
          <p>signatories</p>
        </div>
      </div>
      <div className="space-y-4 px-60">
        {documentToReactComponents(
          takeActionPageEntries.openLetter,
          mainParagraphStyle,
        )}
      </div>
    </div>
  )
}

export default Letter
