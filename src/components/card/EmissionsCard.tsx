import type { FC } from 'react'
import {
  TruckIcon,
  TrashIcon,
  BoltIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

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
      icon = <TruckIcon />
      break
    case 'trashbag':
      icon = <TrashIcon />
      break
    case 'home':
      icon = <BoltIcon />
      break
    case 'tree':
      icon = <GlobeAmericasIcon />
      break
    default:
      icon = <GlobeAmericasIcon />
  }

  return <div className="w-8"> {icon}</div>
}

const EmissionsCard: FC<CardProps> = ({
  title,
  metric,
  description,
  color,
  type,
}) => {
  return (
    <div className="p-8">
      <h2 className="p-2 font-bold">{title}:</h2>
      <div className={clsx('rounded-md border-2 ', `border-${color}`)}>
        <div className="flex place-content-evenly p-4">
          <text
            className={clsx(
              'h-6 w-24 px-2 text-center font-bold',
              {
                'bg-clementine/20': color == 'pumpkin',
              },
              {
                'bg-lightBlue': color == 'brightTeal',
              },
            )}
          >
            {metric}
          </text>
          <text className=" w-64 px-2">{description}</text>
          <Icon type={type} />
        </div>
      </div>
    </div>
  )
}

export default EmissionsCard
