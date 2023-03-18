import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Carousel, HighlightedTitle } from '../../components'
import type { RefuteResponseEntry } from '../../types'

interface RefuteUISResponseProps {
  leftText: Document
  entries: RefuteResponseEntry[]
}

const RefuteUISResponse: FC<RefuteUISResponseProps> = ({
  leftText,
  entries,
}) => {
  return (
    <div className="bg-clementine/20 px-12 py-20">
      <HighlightedTitle title="Refute UIS Response" />
      <div className="flex flex-col lg:flex-row">
        <div className="basis-3/7 px-20 py-8 text-[28px] font-medium leading-tight">
          {documentToReactComponents(leftText)}
        </div>
        <div className="basis-4/7 pr-8">
          <Carousel carouselChildrenData={entries} />
        </div>
      </div>
    </div>
  )
}

export default RefuteUISResponse
