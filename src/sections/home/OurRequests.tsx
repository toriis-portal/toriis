import type { FC } from 'react'

import { RequestAccordion, HighlightedTitle } from '../../components'
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
    </div>
  )
}
export default OurRequest
