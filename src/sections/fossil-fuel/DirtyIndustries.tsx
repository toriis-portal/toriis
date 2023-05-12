import type { ReactNode } from 'react'
import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { HighlightedTitle, Tabs } from '../../components'
import type { DirtyCompanyEntry } from '../../types'
import { mainParagraphStyle } from '../../utils/renderer'

interface TabDetails {
  index: number
  title: string
  content: ReactNode
  url: string
}

const DirtyIndustries: FC<{ companies: DirtyCompanyEntry[] }> = ({
  companies,
}) => {
  const tabDetails: TabDetails[] = []
  companies
    .map((company, i) => {
      if (company != undefined && company.details != undefined) {
        return {
          index: i,
          title: company.companyName ?? '',
          content: documentToReactComponents(
            company.details,
            mainParagraphStyle,
          ),
          url: company.url ?? '',
        }
      }
    })
    .forEach((tabDetail) => {
      if (tabDetail != undefined) {
        tabDetails.push(tabDetail)
      }
    })

  return (
    <div className="bg-white px-12">
      <HighlightedTitle
        title="The Dirty Industry UIUC Supports"
        size="large"
        color="clementine"
      />
      <Tabs tabDetails={tabDetails} />
    </div>
  )
}
export default DirtyIndustries
