import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/HighlightedTitle'
import ListItem from '../components/ListItem'

const InstitutionalDivestments: FC = () => {
  const strings: string[] = HomeData['divestment-strings']

  return (
    <>
      <div className="my-6 w-full space-y-6 px-12">
        <HighlightedTitle title="Institutional Divestment" />
        <div className="ml-[3%] space-y-9">
          {strings.map((string, index) => (
            <ListItem
              key={index + 1}
              listVal={index + 1}
              listContent={string}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default InstitutionalDivestments
