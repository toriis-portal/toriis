import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import type { LinkEntry } from '../../types'
import { HighlightedTitle, ReadMoreAccordion, LinkBox } from '../../components'

interface WarmingProps {
  linkEntries: LinkEntry[]
  footnote: Document
  text: Document
}

const WhatWarmingMeans: FC<WarmingProps> = ({
  linkEntries,
  footnote,
  text,
}) => {
  return (
    <div className="bg-[#FFA90233] p-12">
      <HighlightedTitle
        title="What 1.5C Warning Means"
        size="large"
        color="clementine"
      />
      <div className="flex flex-col items-center justify-center ">
        <ReadMoreAccordion className="w-[85%] bg-white">
          {documentToReactComponents(text)}
        </ReadMoreAccordion>
        <LinkBox
          linkEntries={linkEntries}
          footnote={documentToReactComponents(footnote)}
          title="Relevant Links"
        />
      </div>
    </div>
  )
}
export default WhatWarmingMeans
