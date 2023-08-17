import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import type { LinkEntry } from '../../types'

interface LinkBoxProps {
  linkEntries: LinkEntry[]
  footnote?: React.ReactNode
  title: string
}

const ShadowTitle: FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className={clsx(
        'header-3 w-fit rounded-full bg-white text-center',
        'border-4 border-cobalt',
        'px-2 py-4 md:px-14',
        'shadow-[-8px_8px_0px_0px] shadow-cobalt',
        'first-line:z-10',
      )}
    >
      <p className="text-darkTeal">{text}</p>
    </div>
  )
}

const LinkBox: FC<LinkBoxProps> = ({ linkEntries, footnote, title }) => {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center rounded-xl bg-darkTeal text-white sm:w-fit',
        'mt-16 pb-10 pt-6 md:mx-12 md:px-20',
      )}
    >
      <div className="relative -top-12">
        <ShadowTitle text={title} />
      </div>
      <div className="-p-3 flex w-full flex-col sm:p-0">
        <div className="flex flex-wrap justify-center">
          {linkEntries.map((entry, index) => (
            <div key={index} className="inline-block p-2 text-center underline">
              <Link href={entry.url} target="_blank" rel="noopener noreferrer">
                {entry.name}
              </Link>
              <ArrowUpRightIcon className="ml-2 inline h-4 w-4 stroke-current stroke-1 text-white" />
            </div>
          ))}
        </div>
        <div className="body-small break-words p-2 lg:p-4">{footnote}</div>
      </div>
    </div>
  )
}

export default LinkBox
