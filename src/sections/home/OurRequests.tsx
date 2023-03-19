import type { FC } from 'react'

import { DropDownCard, HighlightedTitle } from '../../components'
import type { OurRequestsEntry } from '../../types'

const OurRequest: FC<{ entries: OurRequestsEntry[] }> = ({ entries }) => {
  return (
    <div className="rounded-xl bg-lightBlue p-12">
      <HighlightedTitle title="Our Requests" />
      {entries.map((entry, index) => (
        <div key={index}>
          <DropDownCard content={entry} />
        </div>
      ))}
    </div>
  )
}
export default OurRequest
