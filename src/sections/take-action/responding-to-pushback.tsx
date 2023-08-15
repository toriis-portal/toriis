import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Carousel, HighlightedTitle } from '../../components'
import type { RefuteResponseEntry } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

interface RespondingToPushbackProps {
  leftText: Document
  entries: RefuteResponseEntry[]
}

const RespondingToPushback: FC<RespondingToPushbackProps> = ({
  leftText,
  entries,
}) => {
  const carouselChildren = entries.map((entry) => [
    <div key={`claim-${entry.order}`}>
      <span className="subheader-1 text-clementine">CLAIM:</span>
      {documentToReactComponents(entry.claim, mainParagraphStyle)}
      <br></br>
    </div>,
    <div key={`response-${entry.order}`}>
      <span className="subheader-1 text-cobalt">RESPONSE:</span>
      {documentToReactComponents(entry.response, mainParagraphStyle)}
    </div>,
  ])
  return (
    <div>
      <div className="px-12">
        <HighlightedTitle
          title="Responding to Pushback"
          size="large"
          color="clementine"
        />
      </div>
      <div className="flex flex-col items-center px-12">
        <div className="space-y-6 lg:px-80">
          {documentToReactComponents(leftText)}
        </div>
        <div className="space-y-6 px-96 pb-12 pt-12">
          <Carousel
            carouselChildren={carouselChildren}
            controlSize="lg"
            variant="white"
            className="rounded-md border-4 border-clementine bg-white px-12 shadow-[-16px_16px_0px_0px] shadow-clementine"
          />
        </div>
      </div>
    </div>
  )
}

export default RespondingToPushback
