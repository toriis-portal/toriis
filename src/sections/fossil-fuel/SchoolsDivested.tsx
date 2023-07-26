import type { FC } from 'react'
import type { Document } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { Carousel, HighlightedTitle } from '../../components'

interface schoolsDivestedProps {
  schoolEntries: Document
  footnote: Document
}

/**
 * Purpose: Parse a string of the type "<a href="https://www.insidehighered.com/quicktakes/2020/04/22/american-u-divests-fossil-fuels">American University</a>"" to
 *          <Link> ... </Link> HTML class
 *
 * Rationale: When switching over to contentful richtext, we want to maintain the general functionality of the `parseEntryToColumns` function (i.e. take in a text
 *            list from contentful, and create "array of React nodes for Carousel"). To do this, we get our string of divested entries by calling the contentful
 *            function `documentToHtmlString()`, which returns a string of consecutive <a> ... </a> HTML classes wrapped inside a <p> </p> HTML class. We then unwrap the
 *            <p> ... </p> class and turn the string of consecutive <a> ... </a> into a list to be parsed (see `const list = entry.slice(3, -4).split('\n')`).
 *            Thus, this function is needed to parse the contentful richtext into the correct <Link> ... </Link> HTML class to be displayed.
 *
 * @param str string of the type <a href="https://www.insidehighered.com/quicktakes/2020/04/22/american-u-divests-fossil-fuels">American University</a>
 * @returns HTML to be rendered
 */
const parseHREFStringToHTML = (str: string): React.ReactNode => {
  const segmentedStr = str.split('"')
  const link = segmentedStr[1]
  const value = segmentedStr[2]?.slice(1, -4)
  return (
    <Link
      href={link as string}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
    >
      {value}
      <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-[1em] w-[1em] stroke-current" />
    </Link>
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
  /*
   * Segment string by new line. We slice by (3, -4) because the documentToHtmlString function from contentful wraps <a> ... </a> classes,
   * which we want, in a <p> </p> class, which we do not want. So we cut out <p> (3 characters) from the front and </p> (4 characters) from the back.
   */
  const list = entry.slice(3, -4).split('\n')

  // Parse into a 2D array by numRows
  const segmentedList: string[][] = []
  for (let i = 0; i < list.length / numRows; i += 1) {
    segmentedList.push(list.slice(i * numRows, (i + 1) * numRows))
  }

  // Parse into an array of React nodes by numCols
  const carouselChildren: React.ReactNode[] = []
  const grid = `grid w-full grid-cols-${numCols} text-center`
  for (let i = 0; i < segmentedList.length / numCols; i += 1) {
    carouselChildren.push(
      <div className={grid}>
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
