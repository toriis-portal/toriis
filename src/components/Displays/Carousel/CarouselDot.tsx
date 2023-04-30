import type { FC } from 'react'
import React from 'react'
import clsx from 'clsx'

interface CircleDotProps {
  active: boolean
  sectionName: string
}

const CarouselDot: FC<CircleDotProps> = ({ active, sectionName }) => {
  const style = clsx(
    'rounded-full',
    active
      ? sectionName === 'Home'
        ? 'bg-pumpkin h-3.5 w-3.5'
        : 'bg-[#0F81E8] h-2 w-2'
      : 'bg-lightGray',
  )

  return <div className={style}></div>
}

export default CarouselDot
