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
      <div className="my-6 w-full space-y-6 px-12">
        <HighlightedTitle title={title} />
        <div className="ml-[3%] space-y-9">
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
