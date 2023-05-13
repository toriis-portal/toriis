import clsx from 'clsx'
import type { FC } from 'react'
import React, { useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

import type { RefuteResponseEntry, divestedEntity } from '../../../types'

import CarouselChild from './CarouselChild'
import CarouselDot from './CarouselDot'

const Carousel: FC<{
  carouselChildrenData: RefuteResponseEntry[] | divestedEntity[]
  sectionName: 'Home' | 'SchoolsDivested' | 'InstitutionsDivested'
}> = ({ carouselChildrenData, sectionName }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < carouselChildrenData.length) {
      setActiveIndex(newIndex)
    }
  }

  const style = clsx(
    'flex flex-col',
    'gap-4  pt-12 pb-8',
    {
      'px-12 shadow-[-16px_16px_0px_0px] shadow-clementine bg-white rounded-md border-4 border-clementine bg-white':
        sectionName === 'Home',
    },
    { 'bg-lightBlue': sectionName === 'SchoolsDivested' },
    { 'bg-clementine/20': sectionName === 'InstitutionsDivested' },
  )

  return (
    <div className={style}>
      <div className="overflow-hidden">
        <div
          className="flex flex-row whitespace-normal transition-transform"
          style={{
            transform: `translateX(-${
              activeIndex * (100 / carouselChildrenData.length)
            }%)`,
            width: `${carouselChildrenData.length * 100}%`,
          }}
        >
          {carouselChildrenData.map((childData, index) => {
            return (
              <CarouselChild
                childData={childData}
                sectionName={sectionName}
                key={index}
              />
            )
          })}
        </div>
      </div>

      <div
        className={clsx('flex items-center', {
          'justify-center gap-10': sectionName !== 'Home',
          'justify-between': sectionName === 'Home',
        })}
      >
        <button
          onClick={() => updateIndex(activeIndex - 1)}
          disabled={activeIndex == 0}
        >
          <ChevronLeftIcon
            className={clsx('stroke-current', {
              'text-black/20': activeIndex == 0,
              'text-black': activeIndex != 0,
              'h-9': sectionName === 'Home',
              'h-4': sectionName !== 'Home',
            })}
          />
        </button>
        <div className="flex flex-row gap-3">
          {carouselChildrenData.map((_, index) => {
            return (
              <CarouselDot
                active={index == activeIndex}
                key={index}
                sectionName={sectionName}
              />
            )
          })}
        </div>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          disabled={activeIndex == carouselChildrenData.length - 1}
        >
          <ChevronRightIcon
            className={clsx('stroke-current', {
              'text-black/20': activeIndex == carouselChildrenData.length - 1,
              'text-black': activeIndex != carouselChildrenData.length - 1,
              'h-9': sectionName === 'Home',
              'h-4': sectionName !== 'Home',
            })}
          />
        </button>
      </div>
    </div>
  )
}

export default Carousel
