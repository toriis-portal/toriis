import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { mainParagraphStyle } from '../../utils/renderer'
import { HighlightedTitle, ClimateClock } from '../../components'

interface FossilFuelsBadProps {
  text: Document
  caption: Document
}

const FossilFuelsBad: FC<FossilFuelsBadProps> = ({ text, caption }) => {
  return (
    <div className="bg-lightBlue p-12">
      <HighlightedTitle
        title="Why Are Fossil Fuels Bad"
        size="large"
        color="clementine"
      />
      <div className="pb-6 sm:px-12">
        {documentToReactComponents(text, mainParagraphStyle)}
        <div className="hidden sm:block">
          <ClimateClock />
        </div>
        <div className="mt-5 rounded-md bg-white p-6 sm:mt-0">
          {documentToReactComponents(caption, mainParagraphStyle)}
        </div>
      </div>
    </div>
  )
}
export default FossilFuelsBad
