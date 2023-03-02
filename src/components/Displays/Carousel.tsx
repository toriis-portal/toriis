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
  width: string
}

const CarouselChild: FC<CarouselChildProps> = ({ childData, width }) => {
  // console.log(childData.text)
  return (
    // <div
    //   // className="flex inline-flex items-center justify-center text-black"
    //   // style={{ width: width }}
    //   // className="w-16"
    // >
    //   {/* <p className="break-normal text-black">{childData.index}</p> */}
    //   <p className="break-normal text-black">{childData.text}</p>
    // </div>

    <p
      // className="flex inline-flex w-1/2 break-normal text-black"
      className="inline-flex h-52	w-10"
      style={{ width: width }}
    >
      {childData.text}
      {/* {childData.index} */}
      {/* blah blah blach */}
    </p>

    // <div
    //   className="flex inline-flex items-center justify-center"
    //   style={{ width: width }}
    // >
    //   {childData.index}
    // </div>
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
    // <div className="flex flex-col rounded-md border-4 border-clementine bg-white">
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
          //flex flex-row
          // whitespace-nowrap
          className="whitespace-nowrap transition-transform" // TODO: mess around w duration, cur 150ms but medium recommended .3s??
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
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
