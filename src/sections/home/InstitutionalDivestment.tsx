import type { FC } from 'react'

import { HighlightedTitle, ListItem, LinkBox } from '../../components'
import type { LinkEntry, ListEntry } from '../../types'

interface InstitutionalDivestmentProps {
  linkEntries: LinkEntry[]
  listEntries: ListEntry[]
}

const InstitutionalDivestment: FC<InstitutionalDivestmentProps> = ({
  linkEntries,
  listEntries,
}) => {
  return (
    <div className="px-12">
      <HighlightedTitle
        title="Institutional Divestment"
        size="large"
        color="clementine"
      />
      <div className="my-6 w-full md:px-12">
        <div className="ml-[3%] space-y-6">
          {listEntries.map((entry, index) => (
            <ListItem
              key={index}
              listIndex={entry.order}
              listContent={entry.details}
            />
          ))}
        </div>
      </div>
      <LinkBox
        title="Institutional Divestment Links"
        linkEntries={linkEntries}
      />
    </div>
  )
}

export default InstitutionalDivestment
