import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

import { Carousel, HighlightedTitle } from '../../components'

import { parseEntryToColumns } from './SchoolsDivested'

interface institutionsDivestedProps {
  institutionEntries: Document
}

const InstitutionsDivested: FC<institutionsDivestedProps> = ({
  institutionEntries,
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
      <div className="body-small pl-16 pt-2 pb-8 text-footnoteGray">
        source:
        <a href="https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Colleges_and_universities_in_the_US">
          {' '}
          https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Governments_and_pension_funds_in_the_US
        </a>
      </div>
    </>
  )
}
export default InstitutionsDivested
