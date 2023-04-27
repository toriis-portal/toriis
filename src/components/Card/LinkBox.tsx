import type { FC } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import { ShadowTitle } from '../../components'
import type { LinkEntry, ListEntry } from '../../types'

interface LinkBoxProps {
  linkEntries: LinkEntry[]
  subscriptEntries?: LinkEntry[]
  listEntries: ListEntry[]
  title: string
}

const InstitutionalDivestments: FC<LinkBoxProps> = ({
  linkEntries,
  subscriptEntries,
  title,
}) => {
  return (
    <div className="px-12">
      <div className="mt-16 flex w-full flex-col items-center rounded-xl bg-darkTeal px-6 pt-6 pb-16 text-white">
        <div className="relative -top-12 ">
          <ShadowTitle text={title} />
        </div>
        <div className="leading-loose underline">
          <div className="flex flex-wrap justify-center ">
            {linkEntries.map((entry, index) => (
              <div key={index} className="mx-2 inline-block text-center">
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
          {subscriptEntries &&
            subscriptEntries.map((entry, index) => (
              <div key={index} className="mx-2 pt-2 text-sm">
                <sup className="text-xs">{index + 1}</sup>
                <Link
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default InstitutionalDivestments
