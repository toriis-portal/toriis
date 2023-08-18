import type { FC } from 'react'

import { RequestAccordion, HighlightedTitle } from '../../components'
import type { OurRequestsEntry } from '../../types'

const LetterRequests: FC<{ entries: OurRequestsEntry[] }> = ({ entries }) => {
  return (
    <div className="p-12">
      <HighlightedTitle title="Our Requests" size="large" color="clementine" />
      {entries.map((entry, index) => (
        <div key={index}>
          <RequestAccordion content={entry} color="lightBlue" />
        </div>
      ))}
    </div>
  )
}
export default LetterRequests
