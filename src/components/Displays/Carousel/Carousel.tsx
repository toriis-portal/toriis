import clsx from 'clsx'
import type { FC } from 'react'
import React, { useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import CarouselChild from './CarouselChild'
import CarouselDot from './CarouselDot'

interface CarouselChildData {
  index: number
  text: string
}
interface CarouselProps {
  carouselChildrenData: CarouselChildData[]
}

const Carousel: FC<CarouselProps> = ({ carouselChildrenData }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < carouselChildrenData.length) {
      setActiveIndex(newIndex)
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col',
        'gap-4 px-12 pt-12 pb-8',
        'rounded-md border-4 border-clementine bg-white',
        'shadow-[-16px_16px_0px_0px] shadow-clementine',
      )}
    >
      <div className="overflow-hidden">
        <div
          className="flex flex-row whitespace-normal transition-transform"
          style={{
            transform: `translateX(-${activeIndex * 25}%)`,
            width: '400%',
          }}
        >
          {carouselChildrenData.map((childData, index) => {
            return <CarouselChild childData={childData} key={index} />
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          disabled={activeIndex == 0}
        >
          <ChevronLeftIcon
            className={`h-9 stroke-current ${
              activeIndex == 0 ? 'text-black/20' : 'text-black'
            }`}
          />
        </button>
        <div className="flex flex-row gap-3">
          {carouselChildrenData.map((_, index) => {
            return <CarouselDot active={index == activeIndex} key={index} />
          })}
        </div>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          disabled={activeIndex == carouselChildrenData.length - 1}
        >
          <ChevronRightIcon
            className={`h-9 stroke-current ${
              activeIndex == carouselChildrenData.length - 1
                ? 'text-black/20'
                : 'text-black'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default Carousel
