import type { ReactNode } from 'react'
import type { FC } from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { HighlightedTitle, Tabs } from '../../components'
import type { DirtyCompanyEntry } from '../../types'

interface TabDetails {
  index: number
  title: string
  content: ReactNode
  url: string
}

const DirtyIndustries: FC<{ companies: DirtyCompanyEntry[] }> = ({
  companies,
}) => {
  const contentfulOptions = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc">{children}</ul>
      ),
      [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
        return (
          <a
            href={node.data.uri as string}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {children}
          </a>
        )
      },
    },
  }

  const tabDetails: TabDetails[] = []
  companies
    .map((company, i) => {
      if (company != undefined && company.details != undefined) {
        return {
          index: i,
          title: company.companyName ?? '',
          content: documentToReactComponents(
            company.details,
            contentfulOptions,
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
    <div className="bg-white p-12">
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
