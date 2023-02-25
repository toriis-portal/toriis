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
      <div className="mx-12 pb-12">
        <div className="mb-6 pb-10">
          <HighlightedTitle title={title} />
        </div>
        <div className="space-y-10">
          {strings.map((curString, curIndex) => (
            <ListItem
              key={curIndex + 1}
              listVal={(curIndex + 1).toString()}
              listContent={curString}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default InstitutionalDivestments
