import clsx from 'clsx'
import type { FC } from 'react'

import { Tag } from '../../components'

interface ChartGroupProps {
  title: string
  chart: React.ReactNode
  interpretation: React.ReactNode
  chartOnLeft: boolean | undefined
  chartSize: 'sm' | 'md' | 'lg'
}

const ChartGroup: FC<ChartGroupProps> = ({
  title,
  chart,
  interpretation,
  chartOnLeft,
  chartSize = 'md',
}) => {
  return (
    <div>
      <Tag
        title={title}
        className="mb-1 w-4 rounded-md bg-clementine text-white"
      />
      <div
        className={clsx('mb-8 mt-4 flex items-center gap-4', {
          'flex-col md:flex-row': chartOnLeft,
          'flex-col md:flex-row-reverse': !chartOnLeft,
        })}
      >
        <div
          className={clsx({
            'md:w-2/5': chartSize === 'sm',
            'md:w-1/2': chartSize === 'md',
            'md:w-3/4': chartSize === 'lg',
          })}
        >
          {chart}
        </div>
        <div
          className={clsx({
            'md:w-3/5': chartSize === 'sm',
            'md:w-1/2': chartSize === 'md',
            'md:w-1/4': chartSize === 'lg',
          })}
        >
          {interpretation}
        </div>
      </div>
    </div>
  )
}
export default ChartGroup
