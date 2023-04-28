import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'
import type { Asset } from 'contentful'

import { mainParagraphStyle } from '../../utils/contentfulOptions'
import type { CaseEntry } from '../../types'
import {
  HighlightedTitle,
  CaseAccordion,
  ImageWithCaption,
} from '../../components'

interface FinancialCaseProps {
  entries: CaseEntry[]
  text: Document
  img: Asset
}

const FinancialCase: FC<FinancialCaseProps> = ({ entries, text, img }) => {
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="Financial Case for Fossil Fuel Divestment"
        size="large"
        color="clementine"
      />
      <div>{documentToReactComponents(text, mainParagraphStyle)}</div>
      <div className="mt-2 text-[#9C9FA1] underline">
        {img.fields.description}
      </div>
      <div className="my-4">
        <HighlightedTitle
          title="Cases for Divestment"
          size="medium"
          color="brightTeal"
        />
      </div>
      <ImageWithCaption
        img={img}
        captionStyle="mb-8 text-sm text-[#9C9FA1] underline "
      />
      {entries.map((entry, index) => (
        <div key={index}>
          <CaseAccordion content={entry} />
        </div>
      ))}
    </div>
  )
}
export default FinancialCase
