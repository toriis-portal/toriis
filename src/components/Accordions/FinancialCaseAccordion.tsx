import type { FC } from 'react'
import { useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import clsx from 'clsx'

import { ReadMoreButton } from '../index'
import type { CaseEntry } from '../../types'

const FinancialCaseAccordion: FC<{ content: CaseEntry }> = ({ content }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div
      className={clsx('mb-6 content-center rounded-xl bg-white md:mx-32', {
        'border-4 border-cobalt': open,
        'border-[3px] border-black': !open,
      })}
    >
      <div
        className={clsx(
          'flex w-full flex-row items-center justify-between bg-lightBlue px-4 py-2 md:flex-row',
          {
            '-mb-[2px] rounded-t-lg': open,
            'rounded-lg': !open,
          },
        )}
      >
        <p
          className={clsx('inline p-4 text-lg font-medium md:ml-6', {
            'md:ml-6': !open,
            '-ml-[1.5px] -mt-[1px] md:ml-[22.5px]': open,
          })}
        >
          {content.title}
        </p>
        <button onClick={handleOpen}>
          {open ? (
            <MinusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
          ) : (
            <PlusIcon className="mr-10 inline h-9 w-7 stroke-current stroke-2" />
          )}
        </button>
      </div>
      {open && (
        <div className="font-regular mx-12 flex flex-col gap-2 border-t-2 border-cobalt pt-6 font-inter text-base text-black">
          {documentToReactComponents(content.details)}
          <div className="flex pt-[7px] pb-5">
            <ReadMoreButton
              isOpen={false}
              handleOpen={() => {
                return
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default FinancialCaseAccordion
