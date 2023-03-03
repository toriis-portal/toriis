import type { FC } from 'react'

import DropDownCard from '../components/Displays/DropDownCard'
import type { Props } from '../types/ourRequest'
import HighlightedTitle from '../components/Text/HighlightedTitle'

const OurRequest: FC<{ data: Array<Props> }> = ({ data }) => {
  return (
    <div className="content-center bg-lightBlue">
      <HighlightedTitle title="Our Requests" />

      <br />
      <div className="items-center">
        {data.map((request, index) => (
          <div key={index}>
            <DropDownCard key={index} item={request} index={index + 1} />
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}
export default OurRequest
