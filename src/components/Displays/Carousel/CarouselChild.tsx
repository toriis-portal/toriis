import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { FC } from 'react'
import React from 'react'

import type { schoolChild } from '../../../types'
import type { RefuteResponseEntry } from '../../../types'

const CarouselChild: FC<{
  childData: RefuteResponseEntry | schoolChild
  sectionName: string
}> = ({ childData, sectionName }) => {
  console.log(childData)
  let columns: string[][] = []

  if (sectionName != 'Home') {
    columns = Array.from({ length: 3 }, (_, i) =>
      childData.details.slice(i * 6, (i + 1) * 6),
    ) as string[][]
  }

  return (
    <>
      {sectionName === 'Home' ? (
        <div className="inline-flex leading-snug" style={{ width: '100%' }}>
          {documentToReactComponents(childData.details)}
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
