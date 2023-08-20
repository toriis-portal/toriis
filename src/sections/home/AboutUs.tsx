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
        <div className="flex w-full flex-col gap-6 text-start md:px-10 lg:px-20 xl:px-40 2xl:px-80">
          {documentToReactComponents(text, mainParagraphStyle)}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
