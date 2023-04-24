import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import { number } from 'zod'

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
    <div className="flex items-center px-12">
      {/* Tab headers, move to separate component? */}
      <div className="flex flex-row space-x-1.5">
        {tabDetails.map((details, i) => {
          return (
            <button key={i} onClick={() => setActiveIndx(i)}>
              <TabHeader title={details.title} active={activeIdx == i} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
