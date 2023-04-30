import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'

interface CircleDotProps {
  active: boolean
  sectionName: 'Home' | 'SchoolsDivested' | 'InstitutionsDivested'
}

const CarouselDot: FC<CircleDotProps> = ({ active, sectionName }) => {
  const style = clsx(
    'rounded-full',
    { 'bg-lightGray h-3.5 w-3.5': sectionName === 'Home' && !active },
    { 'bg-lightGray h-2 w-2': sectionName !== 'Home' && !active },
    { 'bg-pumpkin h-3.5 w-3.5': sectionName === 'Home' && active },
    { 'bg-cobalt h-2 w-2': sectionName == 'SchoolsDivested' && active },
    {
      'bg-clementine h-2 w-2': sectionName == 'InstitutionsDivested' && active,
    },
  )

  return <div className={style}></div>
}

export default CarouselDot
