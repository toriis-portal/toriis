import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Carousel, HighlightedTitle } from '../../components'

import { parseEntryToColumns } from './SchoolsDivested'

interface institutionsDivestedProps {
  institutionEntries: Document
  footnote: Document
}

const InstitutionsDivested: FC<institutionsDivestedProps> = ({
  institutionEntries,
  footnote,
}) => {
  return (
    <>
      <div className="bg-white px-12">
        <HighlightedTitle
          title="Governments & Pension Funds That Have Divested"
          size="large"
          color="clementine"
        />
      </div>
      <Carousel
        carouselChildren={parseEntryToColumns(
          documentToHtmlString(institutionEntries),
          6,
          3,
        )}
        controlSize="sm"
        variant="clementine"
      />
      <div className="body-small pb-8 pl-16 pt-2 text-footnoteGray">
        {documentToReactComponents(footnote)}
      </div>
    </>
  )
}
export default InstitutionsDivested
