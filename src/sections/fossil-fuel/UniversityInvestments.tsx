import type { FC } from 'react'
import type { Asset } from 'contentful'
import Image from 'next/image'
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import type { Document } from '@contentful/rich-text-types'

import { HighlightedTitle, Tag } from '../../components'

interface UniversityInvestmentsProps {
  img: Asset
  caption: Document
}
const UniversityInvestments: FC<UniversityInvestmentsProps> = ({
  img,
  caption,
}) => {
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
        title="University of Illinois Investments"
        size="large"
        color="clementine"
      />
      <div>
        <Tag
          title={img.fields.title}
          className="mb-1 w-4 rounded-md bg-clementine text-black"
        />
        {img.fields.description && <p>{img.fields.description}</p>}
        <Image
          src={'http:' + img.fields.file.url}
          alt={img.fields.title}
          width={1300}
          height={900}
        />
        <div>{documentToReactComponents(caption, contentfulOptions)}</div>
      </div>
    </div>
  )
}
export default UniversityInvestments
