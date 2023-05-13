import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import ReadMoreButton from '../button/ReadMoreButton'

const TabHeader: FC<{ title: string; active: boolean }> = ({
  title,
  active,
}) => {
  const [truncatedTitle, setTruncatedTitle] = useState(title)

  useEffect(() => {
    const MAX_TITLE_LENGTH = window.innerWidth > 1000 ? 5 : 2
    setTruncatedTitle(
      title.length > MAX_TITLE_LENGTH
        ? title.substring(0, MAX_TITLE_LENGTH) + '...'
        : title,
    )
  }, [title, truncatedTitle])

  return (
    <div
      className={clsx(
        'rounded-t-lg  px-4 ',
        { 'bg-lightBlue': !active },
        { 'bg-clementine/20': active },
      )}
    >
      <p
        className={clsx('whitespace-nowrap border-b-2 py-3.5 px-4', {
          'border-lightBlue': !active,
          'border-clementine': active,
        })}
      >
        {active ? title : truncatedTitle}
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
      <div className="flex flex-row space-x-1.5">
        {tabDetails.map((details, idx) => {
          return (
            <button key={idx} onClick={() => setActiveIndx(idx)}>
              <TabHeader title={details.title} active={activeIdx == idx} />
            </button>
          )
        })}
      </div>
      {/* Tab body: */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-clementine/20 p-8 px-16">
        <p className="header-3 pb-8">{tabDetails[activeIdx]?.title}</p>
        {tabDetails[activeIdx]?.content}
        {tabDetails[activeIdx]?.url && (
          <ReadMoreButton isOpen={false} link={tabDetails[activeIdx]?.url} />
        )}
      </div>
    </div>
  )
}

export default Tabs
