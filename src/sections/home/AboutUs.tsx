import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { HighlightedTitle } from '../../components'
import { mainParagraphStyle } from '../../utils/renderer'

const AboutUs: FC<{ text: Document }> = ({ text }) => {
  return (
    <div className="px-12">
      <HighlightedTitle title="About Us" size="large" color="clementine" />
      <div className="flex flex-col items-center justify-center">
        {documentToReactComponents(text, mainParagraphStyle)}
      </div>
    </div>
  )
}

export default AboutUs
