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
      <h2 className="subheader-1 py-6">{title}:</h2>
      <div
        className={clsx('rounded-md border-2', {
          'border-pumpkin': color === 'pumpkin',
          'border-brightTeal': color === 'brightTeal',
        })}
      >
        <div className="flex items-center space-x-4 py-4">
          <div
            className={clsx('ml-4 flex items-center justify-center', {
              'bg-clementine/20': color === 'pumpkin',
              'bg-lightBlue': color === 'brightTeal',
            })}
          >
            <text className="h-6 min-w-[120px] text-center text-xl font-black">
              {metric}
            </text>
          </div>
          <div className="text-lg leading-5">{description}</div>
          <Icon type={type} />
        </div>
      </div>
    </div>
  )
}

export default EmissionsCard
