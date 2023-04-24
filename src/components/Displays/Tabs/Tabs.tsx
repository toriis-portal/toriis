import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

import TabHeader from './TabHeader'

interface TabDetails {
  index: number
  title: string
  content: ReactNode
  url: string
}

const Tabs: FC<{ tabDetails: TabDetails[] }> = ({ tabDetails }) => {
  const [activeIdx, setActiveIndx] = useState(0)

  return (
    <div className="px-12">
      {/* Tab headers:*/}
      <div className="flex flex-row space-x-1.5">
        {tabDetails.map((details, i) => {
          return (
            <button key={i} onClick={() => setActiveIndx(i)}>
              <TabHeader title={details.title} active={activeIdx == i} />
            </button>
          )
        })}
      </div>

      {/* Tab body: */}
      <div className="flex flex-col items-center justify-center rounded-b-lg rounded-tr-lg bg-clementine/20 px-16 pb-8">
        <p className="py-11 text-[22px]">{tabDetails[activeIdx]?.title}</p>
        {tabDetails[activeIdx]?.content}
        {tabDetails[activeIdx]?.url && (
          <Link
            href={tabDetails[activeIdx]?.url ?? ''}
            rel="noopener noreferrer"
            target="_blank"
            className="mt-14 self-end rounded-3xl bg-clementine py-1.5 px-5 underline underline-offset-2"
          >
            Read More
            <ArrowUpRightIcon className="inline h-4 pl-1" />
          </Link>
        )}
      </div>
    </div>
  )
}

export default Tabs
