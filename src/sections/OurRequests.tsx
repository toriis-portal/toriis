import type { FC } from 'react'

import DropDownCard from '../components/Displays/DropDownCard'
import type { Props } from '../types/ourRequest'

const OurRequest: FC<{ data: Array<Props> }> = ({ data }) => {
  console.log('data')
  return (
    <div className="bg-lightBlue">
      <h1 className="bg-clementine bg-[0_200px_100px] text-2xl font-semibold">
        Our Requests
      </h1>
      <br />
      {data.map((request, index) => (
        <div key={index}>
          <DropDownCard key={index} item={request} />
          <br />
        </div>
      ))}
    </div>
  )
}
export default OurRequest
