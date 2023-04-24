import type { FC } from 'react'

import { HighlightedTitle } from '../../components'

const DirtyIndustry: FC = () => {
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="The Dirty Industry UIUC Supports"
        size="large"
        color="clementine"
      />
    </div>
  )
}
export default DirtyIndustry
