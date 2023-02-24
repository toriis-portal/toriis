import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/HighlightedTitle'
import ListItem from '../components/ListItem'

interface DivestmentListProps {
  title: string
}

const InstitutionalDivestments: FC<DivestmentListProps> = ({ title }) => {
  const strings: Array<string> = HomeData['divestment-strings']

  return (
    <>
      <table className="flex-column items-start">
        <tbody>
          <tr>
            <th className="pb-10 text-left text-2xl font-bold">
              <HighlightedTitle title={title} />
            </th>
          </tr>

          {strings.map((curString, curIndex) => (
            <ListItem
              key={curIndex + 1}
              listVal={(curIndex + 1).toString()}
              listContent={curString}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InstitutionalDivestments
