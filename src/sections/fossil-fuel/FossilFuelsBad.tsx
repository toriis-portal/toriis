import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { contentfulOptions } from '../../utils/contentfulOptions'
import { HighlightedTitle } from '../../components'
import { ClimateClock } from '../../components'

interface FossilFuelsBadProps {
  text: Document
  caption: Document
}

const FossilFuelsBad: FC<FossilFuelsBadProps> = ({ text, caption }) => {
  return (
    <div className="bg-[#E6F0FA] p-12">
      <HighlightedTitle
        title="Why Are Fossil Fuels Bad"
        size="large"
        color="clementine"
      />
      <div>{documentToReactComponents(text, contentfulOptions)}</div>
      <ClimateClock />
      <div className="bg-white p-6">
        {documentToReactComponents(caption, contentfulOptions)}
      </div>
    </div>
  )
}
export default FossilFuelsBad
