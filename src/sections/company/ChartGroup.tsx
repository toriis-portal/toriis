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
        className={clsx('mb-8 flex items-center gap-4', {
          'flex-row': chartOnLeft,
          'flex-row-reverse': !chartOnLeft,
        })}
      >
        <div
          className={clsx({
            'w-2/5': chartSize === 'sm',
            'w-1/2': chartSize === 'md',
            'w-3/4': chartSize === 'lg',
          })}
        >
          {chart}
        </div>
        <div
          className={clsx({
            'w-3/5': chartSize === 'sm',
            'w-1/2': chartSize === 'md',
            'w-1/4': chartSize === 'lg',
          })}
        >
          {interpretation}
        </div>
      </div>
    </div>
  )
}
export default ChartGroup
