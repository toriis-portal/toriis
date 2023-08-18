/* eslint-disable */

import { MARKS, INLINES, BLOCKS } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export const mainParagraphStyle = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <span className="font-semibold underline decoration-clementine decoration-2 underline-offset-4">
        {text}
      </span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="align-center break-words">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc">{children}</ul>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: any) => {
      return (
        <Link
          href={node.data.uri as string}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
          <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-[1em] w-[1em] stroke-current" />
        </Link>
      )
    },
  },
}

export const truncateParagraphStyle = (isOpen: boolean) => {
  return {
    renderNode: {
      [BLOCKS.DOCUMENT]: (node: any, children: any) => {
        return (
          <>
            {!isOpen && Array.isArray(children) && children.length > 0
              ? children[0]
              : children}
          </>
        )
      },
      ...mainParagraphStyle.renderNode,
    },
  }
}

export const orderedListStyle = {
  renderNode: {
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-[lower-alpha] pl-12 pr-8 ">{children}</ol>
    ),
  },
}
