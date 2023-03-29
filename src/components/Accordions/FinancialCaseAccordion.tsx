import type { FC } from 'react'
import { useState } from 'react'
import { PlusIcon, MinusIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'
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

  const contentfulOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        if(children.length > 1 && children[1].type == "a")
        {
          return(
            <div className="flex flex-row">
              <p>{children}</p>
              <a href={children[1].props.href} target="_blank" rel="noopener noreferrer">
                <ArrowUpRightIcon className="ml-1 mb-0.5 inline h-4 w-4 align-self-start stroke-current stroke-1" />
              </a>
            </div>
          )
        }
        return <p>{children}</p>
      }
    },
  }

  return (
    <div
      className={clsx('mb-6 content-center rounded-xl bg-white lg:mx-32', {
        'border-4 border-cobalt': open,
        'border-[3px] border-black': !open,
      })}
    >
      <div
        className={clsx(
          'flex w-full flex-row items-center justify-between bg-lightBlue px-4 py-2 lg:flex-row',
          {
            '-mb-[2px] rounded-t-lg': open,
            'rounded-lg': !open,
          },
        )}
      >
        <p
          className={clsx('inline p-4 text-lg font-medium lg:ml-6', {
            'lg:ml-6': !open,
            '-ml-[1.5px] -mt-[1px] lg:ml-[22.5px]': open,
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
          {documentToReactComponents(content.details, contentfulOptions)}
          <div className="flex pt-[7px] pb-5">
            {content.url && 
            <ReadMoreButton
              isOpen={false}
              handleOpen={() => {
                return
              }}
              link={content.url}
            />}
          </div>
        </div>
      )}
    </div>
  )
}
export default FinancialCaseAccordion
