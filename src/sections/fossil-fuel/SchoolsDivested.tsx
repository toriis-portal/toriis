import type { FC } from 'react'

import { Carousel } from '../../components'
import { HighlightedTitle } from '../../components'
import type { schoolChild } from '../../types'
interface schoolsDivestedProps {
  schoolEntries: string
}

function formatSchoolData(schoolEntries: string, limit: number) {
  const list = schoolEntries.split('\n')
  const result: schoolChild[] = []
  for (let i = 0; i < list.length; i += limit) {
    result.push({ order: i / limit, details: list.slice(i, i + limit) })
  }
  return result
}

const SchoolsDivested: FC<schoolsDivestedProps> = ({ schoolEntries }) => {
  return (
    <>
      <div className="bg-white px-12">
        <HighlightedTitle
          title="Schools That Have Divested"
          size="large"
          color="clementine"
        />
      </div>
      <Carousel
        carouselChildrenData={formatSchoolData(schoolEntries, 18)}
        sectionName="SchoolsDivested"
      />
      <div className="body-small pl-16 pt-2 text-footnoteGray">
        source:
        https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Colleges_and_universities_in_the_US
      </div>
    </>
  )
}
export default SchoolsDivested
