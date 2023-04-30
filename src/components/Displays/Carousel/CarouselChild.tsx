import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { FC } from 'react'
import React from 'react'
import type { Document } from '@contentful/rich-text-types'

import type { divestedEntity } from '../../../types'
import type { RefuteResponseEntry } from '../../../types'

const CarouselChild: FC<{
  childData: RefuteResponseEntry | divestedEntity
  sectionName: 'Home' | 'SchoolsDivested' | 'InstitutionsDivested'
}> = ({ childData, sectionName }) => {
  let columns: string[][] = []

  if (sectionName !== 'Home' && Array.isArray(childData.details)) {
    columns = Array.from({ length: 3 }, (_, i) =>
      (childData.details as string[]).slice(i * 6, (i + 1) * 6),
    )
  }

  return (
    <>
      {sectionName === 'Home' ? (
        <div className="inline-flex leading-snug" style={{ width: '100%' }}>
          {documentToReactComponents(childData.details as Document)}
        </div>
      ) : (
        <div className="grid w-screen grid-cols-3">
          {columns.map((column, i) => (
            <div key={i}>
              <ul>
                {column.map((item, j) => (
                  <li className="py-2" key={j}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CarouselChild
