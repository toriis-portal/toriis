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

interface contentfulDocumentList {
  props: {
    children: ReactNode[]
  }
}

const DirtyIndustries: FC<{ companies: DirtyCompanyEntry[] }> = ({
  companies,
}) => {
  const contentfulOptions = {
    renderNode: {
      [BLOCKS.DOCUMENT]: (node: any, children: any) => {
        function containsProps(object: any): object is contentfulDocumentList {
          return 'props' in object
        }
        const canDeconstructChildren =
          Array.isArray(children) &&
          children.length > 0 &&
          containsProps(children[0])

        return canDeconstructChildren && containsProps(children[0]) ? (
          <ul className="list-disc">
            {children[0].props.children.map((elem, i) => (
              <li key={i}>{elem}</li>
            ))}
          </ul>
        ) : (
          <>{children}</>
        )
      },
      [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
        const url =
          'uri' in node.data && typeof node.data.uri == 'string'
            ? node.data.uri
            : '#'
        return (
          <a
            href={url}
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
