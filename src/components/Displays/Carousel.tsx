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
}

interface CircleDotProps {
  active: boolean
}

const CarouselChild: FC<CarouselChildProps> = ({ childData }) => {
  return (
    <p className="inline-flex" style={{ width: '100%' }}>
      {childData.text}
    </p>
  )
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

const Carousel: FC<CarouselProps> = ({ carouselChildrenData }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const initDotsStatuses: boolean[] = []
  for (let i = 0; i < carouselChildrenData.length; i++) {
    initDotsStatuses.push(false)
  }
  initDotsStatuses[0] = true
  const [dotsStatuses, setDotsStatuses] = useState(initDotsStatuses)

  const updateIndex = (newIndex: number) => {
    initDotsStatuses[0] = false
    if (newIndex >= 0 && newIndex < carouselChildrenData.length) {
      setActiveIndex(newIndex)
    }
    const newStatus = [...initDotsStatuses]
    newStatus[newIndex] = true
    setDotsStatuses(newStatus)
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
            className={`h-8 font-extrabold ${
              activeIndex == 0 ? 'text-black/20' : 'text-black'
            }`}
          />
        </button>
        <div className="flex flex-row gap-3">
          {dotsStatuses.map((status: boolean, index) => {
            return <CarouselDot active={status} key={index} />
          })}
        </div>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          disabled={activeIndex == carouselChildrenData.length - 1}
        >
          <ChevronRightIcon
            className={`h-8 font-extrabold ${
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
