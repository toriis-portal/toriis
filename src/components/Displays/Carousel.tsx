import clsx from 'clsx'
import type { FC } from 'react'
import React, { useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface CarouselChildData {
  index: number
  text: string
}
interface CarouselProps {
  carouselChildrenData: CarouselChildData[]
}

interface CarouselChildProps {
  childData: CarouselChildData
  // width: string
}

const CarouselChild: FC<CarouselChildProps> = ({ childData }) => {
  return (
    <p
      // className="flex inline-flex w-1/2 break-normal text-black"
      className="inline-flex"
      style={{ width: '100%' }}
    >
      {childData.text}
    </p>
  )
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
        'gap-2 px-12 pt-12 pb-8',
        'rounded-md border-4 border-clementine bg-white',
        'shadow-[-16px_16px_0px_0px] shadow-clementine',
      )}
    >
      <div className="overflow-hidden">
        <div
          className="flex flex-row whitespace-normal transition-transform" // TODO: mess around w duration, cur 150ms but medium recommended .3s??
          style={{
            transform: `translateX(-${activeIndex * 25}%)`,
            width: '400%',
          }}
        >
          {carouselChildrenData.map((childData, index) => {
            return (
              <CarouselChild childData={childData} key={index}></CarouselChild>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          disabled={activeIndex == 0}
        >
          <ChevronLeftIcon
            className={`h-6 font-extrabold ${
              activeIndex == 0 ? 'text-black/20' : 'text-black'
            }`}
          />
        </button>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          disabled={activeIndex == carouselChildrenData.length - 1}
        >
          <ChevronRightIcon
            className={`h-6 font-extrabold ${
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
