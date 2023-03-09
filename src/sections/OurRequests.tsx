import type { FC } from 'react'

import DropDownCard from '../components/Displays/DropDownCard'
import HighlightedTitle from '../components/Text/HighlightedTitle'
import HomeData from '../info/home.json'

const OurRequest: FC = () => {
  const requests = HomeData.ourRequests
  return (
    <div className=" rounded-xl bg-lightBlue pl-12 pb-10 pt-10">
      <HighlightedTitle title="Our Requests" size="medium" color="clementine" />
      {requests.map((request, index) => (
        <div key={index}>
          <DropDownCard key={index} item={request} index={index + 1} />
        </div>
      ))}
    </div>
  )
}
export default OurRequest
