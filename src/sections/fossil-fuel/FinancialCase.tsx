import type { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import type { Document } from '@contentful/rich-text-types'
import type { Asset } from 'contentful'
import Image from 'next/image'

import type { CaseEntry } from '../../types'
import { HighlightedTitle, CaseAccordion, Tag } from '../../components'

interface FinancialCaseProps {
  entries: CaseEntry[]
  text: Document
  img: Asset
}

const FinancialCase: FC<FinancialCaseProps> = ({ entries, text, img }) => {
  const contentfulOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <span className="font-semibold underline decoration-2 underline-offset-4">
          {text}
        </span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="align-center">{children}</p>
      ),
      [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
        return (
          <a
            href={node.data.uri as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
            <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-4 w-4 stroke-current stroke-1" />
          </a>
        )
      },
    },
  }
  return (
    <div className="bg-white p-12">
      <HighlightedTitle
        title="Financial Case for Fossil Fuel Divestment"
        size="large"
        color="clementine"
      />
      <div>{documentToReactComponents(text, contentfulOptions)}</div>
      <div className="mt-2 text-[#9C9FA1] underline">
        {img.fields.description}
      </div>
      <div className="my-4">
        <HighlightedTitle
          title="Cases for Divestment"
          size="medium"
          color="[#40D7D4]"
        />
      </div>
      <div className="flex h-screen items-center justify-center">
        <Image
          src={'http:' + img.fields.file.url}
          alt={img.fields.title}
          width={1100}
          height={900}
        />
      </div>
      <div className="mb-8 text-sm text-[#9C9FA1] underline ">
        {img.fields.description}
      </div>
      {entries.map((entry, index) => (
        <div key={index}>
          <CaseAccordion content={entry} />
        </div>
      ))}
    </div>
  )
}
export default FinancialCase
