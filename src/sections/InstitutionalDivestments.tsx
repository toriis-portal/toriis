import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/HighlightedTitle'
import ListItem from '../components/ListItem'

interface DivestmentListProps {
  title: string
}

interface JSONData {
  [x: string]: string
}

const InstitutionalDivestments: FC<DivestmentListProps> = ({ title }) => {
  const strings: object = HomeData['divestment-strings'] as object

  return (
    <>
      <table className="flex-column items-start">
        <tbody>
          <tr>
            <th className="pb-10 text-left text-2xl font-bold">
              <HighlightedTitle title={title} />
            </th>
          </tr>
          {Object.keys(strings)?.map((k) => (
            <ListItem
              key={k}
              listVal={k}
              listContent={(strings as JSONData)[k] ?? ''}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InstitutionalDivestments
