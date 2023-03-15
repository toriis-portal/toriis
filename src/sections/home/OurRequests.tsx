import type { FC } from 'react'

import { DropDownCard, HighlightedTitle } from '../../components'
import type { OurRequestEntry } from '../../types'

const OurRequest: FC<{ entries: OurRequestEntry[] }> = ({ entries }) => {
  return (
    <div className=" rounded-xl bg-lightBlue pl-12 pb-10 pt-10">
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
