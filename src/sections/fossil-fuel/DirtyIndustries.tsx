import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { HighlightedTitle, Tabs } from '../../components'
import type { DirtyCompanyEntry } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

const DirtyIndustries: FC<{ companies: DirtyCompanyEntry[] }> = ({
  companies,
}) => {
  const tabDetails = companies.map((company) => ({
    title: company.companyName,
    content: documentToReactComponents(company.details, mainParagraphStyle),
    url: company.url,
  }))

  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="Examining UIS Investments"
        size="large"
        color="clementine"
      />
      <Tabs tabDetails={tabDetails} />
    </div>
  )
}
export default DirtyIndustries
