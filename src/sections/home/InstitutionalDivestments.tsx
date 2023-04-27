import type { FC } from 'react'

import { HighlightedTitle, ListItem, LinkBox } from '../../components'
import type { LinkEntry, ListEntry } from '../../types'

interface InstitutionalDivestmentsProps {
  linkEntries: LinkEntry[]
  subscriptEntries?: LinkEntry[]
  listEntries: ListEntry[]
  title: string
}

const InstitutionalDivestments: FC<InstitutionalDivestmentsProps> = ({
  linkEntries,
  listEntries,
  title,
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
              listVal={entry.order}
              listContent={entry.details}
            />
          ))}
        </div>
      </div>
      <LinkBox
        title={title}
        linkEntries={linkEntries}
        listEntries={listEntries}
      />
    </div>
  )
}

export default InstitutionalDivestments
