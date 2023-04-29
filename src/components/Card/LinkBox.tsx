import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import { ShadowTitle } from '../../components'
import type { LinkEntry } from '../../types'

interface LinkBoxProps {
  linkEntries: LinkEntry[]
  footnote?: React.ReactNode
  title: string
}

const LinkBox: FC<LinkBoxProps> = ({ linkEntries, footnote, title }) => {
  return (
    <div className="px-12">
      <div className="mt-16 flex w-fit flex-col items-center rounded-xl bg-darkTeal px-20 pt-6 pb-10 text-white">
        <div className="relative -top-12 ">
          <ShadowTitle text={title} />
        </div>
        <div className="flex flex-col ">
          <div className="flex flex-wrap justify-center">
            {linkEntries.map((entry, index) => (
              <div
                key={index}
                className="inline-block p-2 text-center underline"
              >
                <Link
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.name}
                </Link>
                <ArrowUpRightIcon className="ml-2 inline h-4 w-4 stroke-current stroke-1 text-white" />
              </div>
            ))}
          </div>
          <div className="body-small p-2 lg:p-4">{footnote}</div>
        </div>
      </div>
    </div>
  )
}

export default LinkBox
