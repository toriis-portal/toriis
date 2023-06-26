import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Carousel, HighlightedTitle } from '../../components'

interface schoolsDivestedProps {
  schoolEntries: Document
  footnote: Document
}

/**
 * Parse a string of the type "<a href="https://www.insidehighered.com/quicktakes/2020/04/22/american-u-divests-fossil-fuels">American University</a>"" to HTML
 *
 * @param str string of the type <a href="https://www.insidehighered.com/quicktakes/2020/04/22/american-u-divests-fossil-fuels">American University</a>
 * @returns html of the type <a href="https://www.insidehighered.com/quicktakes/2020/04/22/american-u-divests-fossil-fuels" target="_blank">American University</a>
 */
const parseHREFStringToHTML = (str: string): React.ReactNode => {
  const list = str.split('"')
  const link = list[1]
  const value = list[2]?.slice(1, -4)
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {value}
    </a>
  )
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
  entry: string,
  numRows: number,
  numCols: number,
): React.ReactNode[] => {
  // Segment string by new line
  const list = entry.slice(3, -4).split('\n')

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
                  {parseHREFStringToHTML(item)}
                </li>
              ))}
            </ul>
          ))}
      </div>,
    )
  }
  return carouselChildren
}

const SchoolsDivested: FC<schoolsDivestedProps> = ({
  schoolEntries,
  footnote,
}) => {
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
          documentToHtmlString(schoolEntries),
          6,
          3,
        )}
        controlSize="sm"
        variant="lightBlue"
      />
      <div className="body-small pl-16 pt-2 text-footnoteGray">
        {documentToReactComponents(footnote)}
      </div>
    </>
  )
}
export default SchoolsDivested
