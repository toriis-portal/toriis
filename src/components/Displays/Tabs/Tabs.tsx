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

  const handleClick = (i: number) => {
    setActiveIndx(i)
  }

  return (
    <div className="flex items-center px-12">
      <div className="flex flex-row space-x-1.5">
        {/* Tab headers, move to separate component? */}
        {tabDetails.map((details, i) => {
          return (
            <TabHeader key={i} title={details.title} active={active_idx == i} />
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
