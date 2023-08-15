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
    <div className="bg-clementine/20 p-6 sm:p-12">
      <HighlightedTitle
        title="What 1.5C Warming Means"
        size="large"
        color="clementine"
        fillWidthOnMobile
      />
      <div className="flex flex-col items-center justify-center ">
        <ReadMoreAccordion className="bg-white" centerReadMoreButton>
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
