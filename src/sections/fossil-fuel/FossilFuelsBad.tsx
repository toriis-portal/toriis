import type { FC } from 'react'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import type { Document } from '@contentful/rich-text-types'

import { HighlightedTitle } from '../../components'
import { ClimateClock } from '../../components'

interface FossilFuelsBadProps {
  text: Document
  caption: Document
}

const FossilFuelsBad: FC<FossilFuelsBadProps> = ({ text, caption }) => {
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
    <div className="bg-[#E6F0FA] p-12">
      <HighlightedTitle
        title="Why Are Fossil Fuels Bad"
        size="large"
        color="clementine"
      />
      <div>{documentToReactComponents(text, contentfulOptions)}</div>
      <ClimateClock />
      <div className="bg-white p-6">
        {documentToReactComponents(caption, contentfulOptions)}
      </div>
    </div>
  )
}
export default FossilFuelsBad
