import type { FC } from 'react'
import React from 'react'

export interface CarouselChildData {
  index: number
  text: string
}

const CarouselChild: FC<{ childData: CarouselChildData }> = ({ childData }) => {
  return (
    <p className="inline-flex leading-snug" style={{ width: '100%' }}>
      {childData.text}
    </p>
  )
}

export default CarouselChild
