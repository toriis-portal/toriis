import type { FC } from 'react'

import { Carousel, HighlightedTitle } from '../../components'

import { parseEntryToColumns } from './SchoolsDivested'

interface institutionsDivestedProps {
  institutionEntries: string
}

const InstitutionsDivested: FC<institutionsDivestedProps> = ({
  institutionEntries,
}) => {
  return (
    <>
      <div className="bg-white px-12">
        <HighlightedTitle
          title="Institutions That Have Divested"
          size="large"
          color="clementine"
        />
      </div>
      <Carousel
        carouselChildren={parseEntryToColumns(institutionEntries, 6, 3)}
        controlSize="sm"
        variant="clementine"
      />
      <div className="body-small pl-16 pt-2 pb-8 text-footnoteGray">
        source:
        https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Colleges_and_universities_in_the_US
      </div>
    </>
  )
}
export default InstitutionsDivested
