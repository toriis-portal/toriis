import type { FC } from 'react'

import HomeData from '../../info/home.json'
import { DropDownCard, HighlightedTitle } from '../../components'

const OurRequest: FC<{ content: any }> = ({ content }) => {
  const requests = HomeData.ourRequests
  console.log(content)

  return (
    <div className=" rounded-xl bg-lightBlue pl-12 pb-10 pt-10">
      <HighlightedTitle title="Our Requests" />
      {requests.map((request, index) => (
        <div key={index}>
          <DropDownCard key={index} item={request} index={index + 1} />
        </div>
      ))}
    </div>
  )
}
export default OurRequest
