import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import clsx from 'clsx'

import { NumberCircle, ReadMoreButton } from '../index'
import type { OurRequestEntry } from '../../types'

const DropDownCard: FC<{ content: OurRequestEntry }> = ({ content }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  const contentfulOptions = {
    renderNode: {
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-[lower-alpha] pl-12 pr-8 ">{children}</ol>
      ),
    },
  }

  return (
    <div
      className={clsx('mb-6 ml-8 mr-20 content-center rounded-xl bg-white', {
        'border-4 border-cobalt': open,
      })}
    >
      <div
        className={clsx('flex w-full items-center space-x-8 pr-16 pl-20 pt-6', {
          'pb-10': open,
        })}
      >
        <NumberCircle val={content.order} />
        <p className="mb-2 inline pl-8 pt-6 text-lg font-medium">
          {content.title}
        </p>
      </div>
      {open && (
        <div className="font-Inter border-t-2 border-cobalt pl-20 pr-20 pt-6 text-base text-neutral-600">
          {documentToReactComponents(content.details, contentfulOptions)}
        </div>
      )}
      <div className="flex pb-6 pr-6">
        <ReadMoreButton isOpen={open} handleOpen={handleOpen} />
      </div>
    </div>
  )
}
export default DropDownCard
