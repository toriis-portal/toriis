import type { FC } from 'react'
import type { Asset } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle, ImageWithCaption, Tag } from '../../components'

interface UniversityInvestmentsProps {
  img: Asset
  caption: Document
}
const UniversityInvestments: FC<UniversityInvestmentsProps> = ({
  img,
  caption,
}) => {
  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div className="px-12">
        <Tag
          title={img.fields.title}
          className="mb-1 w-4 rounded-md bg-clementine/20 text-black"
        />
        <ImageWithCaption img={img} />
        <div>{documentToReactComponents(caption, mainParagraphStyle)}</div>
      </div>
    </div>
  )
}
export default UniversityInvestments
