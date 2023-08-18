import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'

import CarIcon from '../icon/CarIcon'
import PlugIcon from '../icon/PlugIcon'
import TreeIcon from '../icon/TreeIcon'
import TrashIcon from '../icon/TrashIcon'

export interface CardProps {
  title: string
  metric: string
  description: string
  color: string
  type: string
}

interface IconProps {
  type: string
}

const Icon: FC<IconProps> = ({ type }) => {
  let icon

  switch (type) {
    case 'gasoline':
      icon = <CarIcon />
      break
    case 'trashbag':
      icon = <TrashIcon />
      break
    case 'home':
      icon = <PlugIcon />
      break
    case 'tree':
      icon = <TreeIcon />
      break
  }

  return <div className="px-3"> {icon}</div>
}

const EmissionsCard: FC<CardProps> = ({
  title,
  metric,
  description,
  color,
  type,
}) => {
  return (
    <div className="py-4">
      <h2 className="subheader-1 py-2 leading-none md:py-6">{title}:</h2>
      <div
        className={clsx(
          'flex flex-col items-center rounded-md border-2 py-4 md:flex-row md:px-4',
          {
            'border-pumpkin': color === 'pumpkin',
            'border-brightTeal': color === 'brightTeal',
          },
        )}
      >
        <div
          className={clsx(
            'mb-2 min-w-[120px] basis-1/4 text-center text-xl font-black md:mb-0',
            {
              'bg-clementine/20': color === 'pumpkin',
              'bg-lightBlue': color === 'brightTeal',
            },
          )}
        >
          {metric}
        </div>
        <div className="flex basis-3/4 flex-row items-center md:justify-between">
          <div className="ml-4 text-lg leading-5">{description}</div>
          <Icon type={type} />
        </div>
      </div>
    </div>
  )
}

export default EmissionsCard
