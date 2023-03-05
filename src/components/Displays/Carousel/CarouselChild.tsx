import type { FC } from 'react'
import React from 'react'

interface CarouselChildData {
  index: number
  text: string
}

interface CarouselChildProps {
  childData: CarouselChildData
}

const CarouselChild: FC<CarouselChildProps> = ({ childData }) => {
  return (
    <p className="inline-flex leading-snug" style={{ width: '100%' }}>
      {childData.text}
    </p>
  )
}

export default CarouselChild
