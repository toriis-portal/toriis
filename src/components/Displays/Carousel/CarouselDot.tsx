import type { FC } from 'react'
import React from 'react'

interface CircleDotProps {
  active: boolean
}

const CarouselDot: FC<CircleDotProps> = ({ active }) => {
  return (
    <div
      className={`h-3.5 w-3.5 rounded-full ${
        active ? 'bg-pumpkin' : 'bg-lightGray'
      }`}
    ></div>
  )
}

export default CarouselDot
