import type { FC } from 'react'

import { Carousel, HighlightedTitle } from '../../components'
import type { institutionChild } from '../../types'

interface institutionsDivestedProps {
  institutionEntries: string
}

function formatInstitutionData(institutionEntries: string, limit: number) {
  const list = institutionEntries.split('\n')
  const result: institutionChild[] = []
  for (let i = 0; i < list.length; i += limit) {
    result.push({ order: i / limit, details: list.slice(i, i + limit) })
  }
  return result
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
        carouselChildrenData={formatInstitutionData(institutionEntries, 18)}
        sectionName="InstitutionsDivested"
      />
      <div className="body-small pl-16 pt-2 pb-8 text-footnoteGray">
        source:
        https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Colleges_and_universities_in_the_US
      </div>
    </>
  )
}
export default InstitutionsDivested
