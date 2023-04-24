import type { FC, ReactNode } from 'react'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

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
  console.log(companies)

  const contentfulOptions = {
    renderNode: {
      [BLOCKS.DOCUMENT]: (node: any, children: any) => {
        return (
          <>
            {!open && Array.isArray(children) && children.length > 0
              ? children[0]
              : children}
          </>
        )
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
        const url =
          'uri' in node.data && typeof node.data.uri == 'string'
            ? node.data.uri
            : '#'
        return (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {children}
            <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-4 w-4 stroke-current stroke-1" />
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
    .forEach((td) => {
      if (td != undefined) {
        tabDetails.push(td)
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
