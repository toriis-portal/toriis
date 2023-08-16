import type { FC } from 'react'
import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import clsx from 'clsx'

import type { CaseEntry } from '../../types'
import { truncateParagraphStyle } from '../../utils/renderer'

const CaseAccordion: FC<{ content: CaseEntry }> = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={clsx(
        'mb-6 content-center rounded-xl border-[3px] border-cobalt bg-white',
      )}
    >
      <button
        onClick={handleOpen}
        className={clsx(
          '-mb-[0.125rem] flex w-full flex-row items-center justify-between rounded-t-lg bg-lightBlue px-4 py-2 lg:flex-row',
        )}
      >
        <p
          className={clsx('header-3 inline p-4 lg:ml-6', {
            'lg:ml-6': !isOpen,
            '-ml-[1.5px] -mt-[1px] lg:ml-[22.5px]': isOpen,
          })}
        >
          {content.title}
        </p>
        {isOpen ? (
          <MinusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
        ) : (
          <PlusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
        )}
      </button>
      <div
        className={clsx(
          'body-normal flex flex-col gap-2 border-t-[0.125rem] border-cobalt pb-9 pt-6 text-black',
          {
            'mx-[47px]': isOpen,
            'mx-12': !isOpen,
          },
        )}
      >
        {documentToReactComponents(
          content.details,
          truncateParagraphStyle(isOpen),
        )}
      </div>
    </div>
  )
}
export default CaseAccordion
