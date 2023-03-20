import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import clsx from 'clsx'

import { NumberCircle, ReadMoreButton } from '../index'
import type { OurRequestsEntry } from '../../types'

const DropDownCard: FC<{ content: OurRequestsEntry }> = ({ content }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  // Custom contentful render for ordered list
  const contentfulOptions = {
    renderNode: {
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-[lower-alpha] pl-12 pr-8 ">{children}</ol>
      ),
    },
  }

  return (
    <div
      className={clsx('mb-6 content-center rounded-xl bg-white md:mx-20', {
        'border-4 border-cobalt': open,
      })}
    >
      <div
        className={clsx(
          'flex w-full flex-col items-center px-4 pt-10 md:flex-row md:px-20',
          {
            'pb-10': open,
          },
        )}
      >
        <NumberCircle val={content.order} />
        <p className="inline p-4 text-lg font-medium md:ml-6">
          {content.title}
        </p>
      </div>
      {open && (
        <div className="font-Inter border-t-2 border-cobalt px-4 pt-6 text-base text-neutral-600 md:px-20">
          {documentToReactComponents(content.details, contentfulOptions)}
        </div>
      )}
      <div className="flex px-6 pb-6">
        <ReadMoreButton isOpen={open} handleOpen={handleOpen} />
      </div>
    </div>
  )
}
export default DropDownCard
