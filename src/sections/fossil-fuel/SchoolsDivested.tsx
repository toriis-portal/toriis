import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type { Document } from '@contentful/rich-text-types'

import { Carousel, HighlightedTitle } from '../../components'

interface schoolsDivestedProps {
  schoolEntries: Document
}

/**
 * Parse string of divested entities into an array of React nodes for Carousel
 *
 * @param entry Divested entities as a string, separated by new line
 * @param numRows  Number of rows per column
 * @param numCols  Number of columns per carousel child
 * @returns React nodes array for Carousel
 */
export const parseEntryToColumns = (
  entry: React.ReactNode,
  numRows: number,
  numCols: number,
): React.ReactNode[] => {
  // Segment string by new line

  const list = entry ? entry.toString().split('\n') : ['']

  // Parse into a 2D array by numRows
  const segmentedList: string[][] = []
  for (let i = 0; i < list.length / numRows; i += 1) {
    segmentedList.push(list.slice(i * numRows, (i + 1) * numRows))
  }

  // Parse into an array of React nodes by numCols
  const carouselChildren: React.ReactNode[] = []
  for (let i = 0; i < segmentedList.length / numCols; i += 1) {
    carouselChildren.push(
      <div className="grid w-full grid-cols-3 text-center">
        {segmentedList
          .slice(i * numCols, (i + 1) * numCols)
          .map((column, i) => (
            <ul key={i}>
              {column.map((item, j) => (
                <li className="py-2" key={j}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
      </div>,
    )
  }
  return carouselChildren
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
        carouselChildren={parseEntryToColumns(
          documentToReactComponents(schoolEntries),
          6,
          3,
        )}
        controlSize="sm"
        variant="lightBlue"
      />
      <div className="body-small pl-16 pt-2 text-footnoteGray">
        source:
        https://en.wikipedia.org/wiki/Fossil_fuel_divestment#Colleges_and_universities_in_the_US
      </div>
    </>
  )
}
export default SchoolsDivested
