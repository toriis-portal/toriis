import type { FC } from 'react'
import React from 'react'

interface CarouselChildData {
  index: number
  text: string
}
interface CarouselProps {
  carouselChildrenData: CarouselChildData[]
}

interface CarouselChildProps {
  childData: CarouselChildData
  width: string
}

const CarouselChild: FC<CarouselChildProps> = ({ childData, width }) => {
  return (
    <div
      className="flex inline-flex items-center justify-center"
      style={{ width: width }}
    >
      {childData.index}
    </div>
  )
}

const Carousel: FC<CarouselProps> = ({ carouselChildrenData }) => {
  return (
    <div className="overflow-hidden">
      <div
        className="whitespace-nowrap transition-transform" // TODO: mess around w duration, cur 150ms but medium recommended .3s??
        style={{ transform: 'translateX(-0%)' }}
      >
        {carouselChildrenData.map((childData, index) => {
          return (
            <CarouselChild
              childData={childData}
              width="100%"
              key={index}
            ></CarouselChild>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
