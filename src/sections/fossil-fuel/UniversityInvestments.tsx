import type { FC } from 'react'
import type { Asset } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { contentfulOptions } from '../../utils/contentfulOptions'
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
    <div className="bg-white p-12">
      <HighlightedTitle
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div>
        <Tag
          title={img.fields.title}
          className="mb-1 w-4 rounded-md bg-[#FFA90233]
text-black"
        />
        <ImageWithCaption img={img} />
        <div>{documentToReactComponents(caption, contentfulOptions)}</div>
      </div>
    </div>
  )
}
export default UniversityInvestments