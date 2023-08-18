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
      <div className="flex justify-center">
        <div className="flex flex-col gap-6 text-center md:w-2/4">
          {documentToReactComponents(text, mainParagraphStyle)}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
