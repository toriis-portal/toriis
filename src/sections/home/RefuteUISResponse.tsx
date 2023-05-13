import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Carousel, HighlightedTitle } from '../../components'
import type { RefuteResponseEntry } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

interface RefuteUISResponseProps {
  leftText: Document
  entries: RefuteResponseEntry[]
}

const RefuteUISResponse: FC<RefuteUISResponseProps> = ({
  leftText,
  entries,
}) => {
  const carouselChildren = entries.map((entry) =>
    documentToReactComponents(entry.details, mainParagraphStyle),
  )
  return (
    <div className="bg-clementine/20 p-12">
      <HighlightedTitle
        title="Refute UIS Response"
        size="large"
        color="clementine"
      />
      <div className="flex flex-col lg:flex-row">
        <div className="header-3 basis-3/7 px-20 py-8 leading-tight">
          {documentToReactComponents(leftText)}
        </div>
        <div className="basis-4/7 lg:pr-8">
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

export default RefuteUISResponse
