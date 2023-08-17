import type { FC } from 'react'
import React, { useState } from 'react'
import clsx from 'clsx'

import ReadMoreButton from '../button/ReadMoreButton'

const TabHeader: FC<{ title: string; active: boolean }> = ({
  title,
  active,
}) => {
  return (
    <div
      className={clsx(
        'px-4 sm:rounded-t-lg ',
        { 'bg-lightBlue': !active },
        { 'bg-clementine/20': active },
        'border-x-2 border-t-2 border-gray-100 sm:border-0',
      )}
    >
      <p
        className={clsx(
          'whitespace-nowrap border-b-2 px-4 py-3.5',
          {
            'border-lightBlue': !active,
            'border-clementine': active,
          },
          `overflow-hidden text-ellipsis ${active ? '' : 'sm:max-w-[4.5rem]'}`,
        )}
      >
        {title}
      </p>
    </div>
  )
}

interface TabDetails {
  title: string
  content: React.ReactNode
  url: string
}

const Tabs: FC<{ tabDetails: TabDetails[] }> = ({ tabDetails }) => {
  const [activeIdx, setActiveIndx] = useState(0)

  return (
    <div className="md:px-12">
      {/* Tab headers:*/}
      <div className="mb-2 flex w-full flex-col sm:mb-0 sm:flex-row sm:flex-wrap sm:space-x-1.5">
        {/* TODO: This is a react anti-pattern. Should remove */}
        {tabDetails.map((details, idx) => {
          return (
            <button key={idx} onClick={() => setActiveIndx(idx)}>
              <TabHeader title={details.title} active={activeIdx === idx} />
            </button>
          )
        })}
      </div>
      {/* Tab body: */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-clementine/20 p-8 sm:px-16">
        <p className="header-3 pb-8 text-center">
          {tabDetails[activeIdx]?.title}
        </p>
        {tabDetails[activeIdx]?.content}
        {tabDetails[activeIdx]?.url && (
          <ReadMoreButton isOpen={false} link={tabDetails[activeIdx]?.url} />
        )}
      </div>
    </div>
  )
}

export default Tabs
