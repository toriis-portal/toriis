import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'
import type { Asset } from 'contentful'

import { mainParagraphStyle } from '../../utils/renderer'
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
  footnote: Document
}

const DivestmentCase: FC<FinancialCaseProps> = ({
  entries,
  text,
  img,
  footnote,
}) => {
  return (
    <div className="bg-white px-6 sm:px-12">
      <HighlightedTitle
        title="The Case for Fossil Fuel Divestment"
        size="large"
        color="clementine"
        fillWidthOnMobile
      />
      <div className="sm:px-12">
        <div className="flex flex-col gap-3">
          {documentToReactComponents(text, mainParagraphStyle)}
        </div>
        <div className="mt-4">
          <HighlightedTitle
            title="Cases for Divestment"
            size="medium"
            color="brightTeal"
            fillWidthOnMobile
          />
        </div>
        <ImageWithCaption img={img} />
        <div className="lg:px-20">
          {entries.map((entry, index) => (
            <div key={index}>
              <CaseAccordion content={entry} />
            </div>
          ))}
          <div className="body-small break-words text-footnoteGray">
            {documentToReactComponents(footnote)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default DivestmentCase
