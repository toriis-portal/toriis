import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

export const contentfulOptions = {
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
