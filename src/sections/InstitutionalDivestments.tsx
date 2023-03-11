import type { FC } from 'react'

import HomeData from '../info/home.json'
import HighlightedTitle from '../components/Text/HighlightedTitle'
import ListItem from '../components/Displays/ListItem'
import LinkDisplay from '../components/Displays/LinkDisplay'

const InstitutionalDivestments: FC = () => {
  const strings: string[] = HomeData.instDivestment.listItems

  return (
    <>
      <HighlightedTitle
        title="Institutional Divestment"
        size="large"
        color="clementine"
      />
      <div className="my-6 w-full px-12">
        <div className="ml-[3%] space-y-6">
          {strings.map((string, index) => (
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
