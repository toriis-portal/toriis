import { MARKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

export const mainParagraphStyle = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <span className="font-semibold underline decoration-2 underline-offset-4">
        {text}
      </span>
    ),
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
      return (
        <a
          href={node.data.uri as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-[1em] w-[1em] stroke-current" />
        </a>
      )
    },
  },
}
