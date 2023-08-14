import type { FC } from 'react'

export interface CardProps {
  title: string
  metric: string
  description: string
}

const EmissionsCard: FC<CardProps> = ({ title, metric, description }) => {
  return <div>test</div>
}

export default EmissionsCard
