import type { FC } from 'react'

import DropDownCard from '../components/Displays/DropDownCard'
import type { Props } from '../types/ourRequest'
import HighlightedTitle from '../components/Text/HighlightedTitle'

const OurRequest: FC<{ data: Array<Props> }> = ({ data }) => {
  return (
    <div className=" rounded-xl bg-lightBlue">
      <br />
      <div className="pl-12 pb-2">
        <HighlightedTitle title="Our Requests" />
      </div>
      <div className="flex w-full flex-col justify-center">
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
