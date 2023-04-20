import type { FC } from 'react'

import { HighlightedTitle, Tabs } from '../../components'
import type { DirtyCompanyEntry } from '../../types'

const DirtyIndustries: FC<{ companies: DirtyCompanyEntry[] }> = ({
  companies,
}) => {
  console.log(companies)
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="The Dirty Industry UIUC Supports"
        size="large"
        color="clementine"
      />
      <Tabs />
    </div>
  )
}
export default DirtyIndustries
