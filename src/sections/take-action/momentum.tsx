import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { HighlightedTitle, ListItem } from '../../components'
import type { ListEntryDocument } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

const Momentum: FC<{ entries: ListEntryDocument[] }> = ({ entries }) => {
  return (
    <div className="px-16 pb-36">
      <HighlightedTitle
        title="Continue the Momentum"
        size="large"
        color="clementine"
      />
      <div className="my-6 mt-16 w-full md:px-12">
        <div className="ml-[3%] w-4/6 space-y-6">
          {entries.map((entry, index) => (
            <ListItem
              key={index}
              listIndex={entry.order}
              listContent={documentToReactComponents(
                entry.details,
                mainParagraphStyle,
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Momentum
