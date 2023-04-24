import clsx from 'clsx'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'

interface TabDetails {
  index: number
  title: string
  content: ReactNode
  url: string
}

const Tabs: FC<{ tabDetails: TabDetails[] }> = ({ tabDetails }) => {
  return (
    <div className="flex items-center px-12">
      <div className="flex flex-row">
        {/* Tab headers, move to separate component? */}
        {tabDetails.map((details, i) => {
          return (
            <div key={i}>
              {/* Tab header, move to separate component? */} {details.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
