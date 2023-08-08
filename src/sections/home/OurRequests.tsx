import type { FC } from 'react'

import {
  RequestAccordion,
  HighlightedTitle,
  PrimaryButton,
} from '../../components'
import type { OurRequestsEntry } from '../../types'

const OurRequest: FC<{ entries: OurRequestsEntry[] }> = ({ entries }) => {
  return (
    <div className="bg-lightBlue p-12">
      <HighlightedTitle title="Our Requests" size="large" color="clementine" />
      {entries.map((entry, index) => (
        <div key={index}>
          <RequestAccordion content={entry} />
        </div>
      ))}
      <div className="flex flex-col items-center">
        <div className="subheader-1 m-8 text-8xl">TAKE ACTION</div>
        <PrimaryButton
          text="Sign the Open Letter"
          link="/take-action"
          variant="clementine"
        />
      </div>
    </div>
  )
}
export default OurRequest
