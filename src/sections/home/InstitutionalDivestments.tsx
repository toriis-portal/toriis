import type { FC } from 'react'

import HomeData from '../../info/home.json'
import { HighlightedTitle, ListItem } from '../../components'

import LinkDisplay from './LinkDisplay'

const InstitutionalDivestments: FC = () => {
  const divestmentList: string[] = HomeData.instDivestment.listItems

  return (
    <>
      <HighlightedTitle title="Institutional Divestment" />
      <div className="my-6 w-full px-12">
        <div className="ml-[3%] space-y-6">
          {divestmentList.map((string, index) => (
            <ListItem
              key={index + 1}
              listVal={index + 1}
              listContent={string}
            />
          ))}
        </div>
      </div>
      <LinkDisplay />
    </>
  )
}

export default InstitutionalDivestments
