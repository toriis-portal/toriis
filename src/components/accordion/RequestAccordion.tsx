import type { FC } from 'react'
import { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import clsx from 'clsx'

import { NumberCircle, ReadMoreButton } from '../index'
import type { OurRequestsEntry } from '../../types'
import { orderedListStyle } from '../../utils/renderer'

const RequestAccordion: FC<{
  content: OurRequestsEntry
  color?: 'lightBlue'
}> = ({ content, color = 'white' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={clsx(`mb-6 content-center rounded-xl bg-${color} md:mx-20`, {
        'border-4 border-cobalt': isOpen,
      })}
    >
      <div
        className={clsx(
          'flex w-full flex-col items-center px-4 pt-10 md:flex-row md:px-20',
          {
            'pb-10': isOpen,
          },
        )}
      >
        <NumberCircle val={content.order} />
        <p className="inline p-4 md:ml-6">{content.title}</p>
      </div>
      {isOpen && (
        <div className="body-normal border-t-2 border-cobalt px-4 pt-6 text-neutral-600 md:px-20">
          {documentToReactComponents(content.details, orderedListStyle)}
        </div>
      )}
      <div className="body-normal flex px-6 pb-6">
        <ReadMoreButton isOpen={isOpen} handleOpen={handleOpen} />
      </div>
    </div>
  )
}
export default RequestAccordion
