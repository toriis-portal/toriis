import type { FC } from 'react'
import { useState } from 'react'
import {
  PlusIcon,
  MinusIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/solid'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import type {
  Block,
  Inline,
} from '@contentful/rich-text-types/dist/types/types'
import clsx from 'clsx'

import type { CaseEntry } from '../../types'

const CaseAccordion: FC<{ content: CaseEntry }> = ({ content }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

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

  return (
    <div
      className={clsx('mb-6 content-center rounded-xl bg-white lg:mx-32', {
        'border-4 border-cobalt': open,
        'border-[3px] border-black': !open,
      })}
    >
      <button
        onClick={handleOpen}
        className={clsx(
          '-mb-[0.125rem] flex w-full flex-row items-center justify-between rounded-t-lg bg-lightBlue px-4 py-2 lg:flex-row',
        )}
      >
        <p
          className={clsx('header-3 inline p-4 lg:ml-6', {
            'lg:ml-6': !open,
            '-ml-[1.5px] -mt-[1px] lg:ml-[22.5px]': open,
          })}
        >
          {content.title}
        </p>
        {open ? (
          <MinusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
        ) : (
          <PlusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
        )}
      </button>
      <div
        className={clsx(
          'body-normal flex flex-col gap-2 border-t-[0.125rem] border-cobalt pt-6 pb-9 text-black',
          {
            'mx-[47px]': open,
            'mx-12': !open,
          },
        )}
      >
        {documentToReactComponents(content.details, contentfulOptions)}
      </div>
    </div>
  )
}
export default CaseAccordion
