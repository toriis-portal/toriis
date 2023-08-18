import type { Signatory } from '@prisma/client'

import { HighlightedTitle, Carousel } from '../../components'
import { api } from '../../utils/api'

interface SourceData {
  id: string
  firstName: string
  lastName: string
  title: string[]
  institution: string[]
  email: string
  createdAt: Date
  city: string | null
  country: string | null
  zipCode: number | null
  bioLink: string | null
  twitter: string | null
  shouldEmail: boolean
}

export const parseSignatoriesToColumns = (
  data: SourceData[] | undefined,
  entryType: 'text' | 'html',
  numRows: number,
  numCols: number,
): React.ReactNode[] => {
  if (data === undefined) {
    return ['']
  }

  // Parse into a 2D array by numRows
  const segmentedList: SourceData[][] = []
  for (let i = 0; i < data.length / numRows; i += 1) {
    segmentedList.push(data.slice(i * numRows, (i + 1) * numRows))
  }

  // Parse into an array of React nodes by numCols
  const carouselChildren: React.ReactNode[] = []
  for (let i = 0; i < segmentedList.length / numCols; i += 1) {
    carouselChildren.push(
      <div className={`grid w-full p-16 grid-cols-${numCols}`}>
        {segmentedList
          .slice(i * numCols, (i + 1) * numCols)
          .map((column, i) => (
            <ol key={i} className="list-inside list-disc">
              {column.map((item, j) => (
                <li className="list-item list-outside" key={j}>
                  <strong>{item.firstName + ' ' + item.lastName}</strong>
                  {item.title.length > 0
                    ? item.title[0] != ''
                      ? ', ' + item.title.reduce((x, y) => x + '; ' + y)
                      : ' '
                    : ' '}
                  {item.institution.length > 0
                    ? item.institution[0] != ''
                      ? ', ' + item.title.reduce((x, y) => x + '; ' + y)
                      : ' '
                    : ''}
                </li>
              ))}
            </ol>
          ))}
      </div>,
    )
  }
  return carouselChildren
}

const Signatories = () => {
  const { data } = api.signatory.getSignatories.useQuery<Signatory[]>(
    undefined,
    {
      refetchOnWindowFocus: false,
    },
  )
  return (
    <div>
      <div className="flex justify-center">
        <HighlightedTitle title="Signatories" size="large" color="clementine" />
      </div>
      <Carousel
        carouselChildren={parseSignatoriesToColumns(data, 'text', 20, 1)}
        controlSize="sm"
        variant="lightBlue"
      />
    </div>
  )
}

export default Signatories
