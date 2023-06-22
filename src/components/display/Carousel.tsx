import clsx from 'clsx'
import type { FC } from 'react'
import React, { useState } from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface CarouselProps {
  carouselChildren: React.ReactNode[]
  controlSize: 'sm' | 'lg'
  variant: 'white' | 'lightBlue' | 'clementine'
  className?: string
}

interface CircleDotProps {
  active: boolean
  controlSize: 'sm' | 'lg'
  variant: 'white' | 'lightBlue' | 'clementine'
}

const CarouselDot: FC<CircleDotProps> = ({ active, controlSize, variant }) => {
  const style = clsx(
    'rounded-full',
    { 'h-3.5 w-3.5': controlSize === 'lg' },
    { 'h-2 w-2': controlSize === 'sm' },
    { 'bg-lightGray': active === false },
    { 'bg-pumpkin': variant === 'white' && active },
    { 'bg-cobalt': variant == 'lightBlue' && active },
    {
      'bg-clementine h-2 w-2': variant == 'clementine' && active,
    },
  )

  return <div className={style}></div>
}

const Carousel: FC<CarouselProps> = ({
  carouselChildren,
  controlSize,
  variant,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const updateIndex = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < carouselChildren.length) {
      setActiveIndex(newIndex)
    }
  }

  return (
    <div
      className={clsx(
        'flex flex-col',
        'gap-4  pt-12 pb-8',
        { 'bg-white': variant === 'white' },
        { 'bg-lightBlue': variant === 'lightBlue' },
        { 'bg-clementine/20': variant === 'clementine' },
        className,
      )}
    >
      <div className="overflow-hidden">
        <div
          className="flex flex-row whitespace-normal transition-transform"
          style={{
            transform: `translateX(-${
              activeIndex * (100 / carouselChildren.length)
            }%)`,
            width: `${carouselChildren.length * 100}%`,
          }}
        >
          {carouselChildren.map((child, index) => (
            <div key={index} className="w-full">
              {child}
            </div>
          ))}
        </div>
      </div>

      <div
        className={clsx('flex items-center', {
          'justify-center gap-10': controlSize === 'sm',
          'justify-between': controlSize === 'lg',
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
              'h-9': controlSize === 'lg',
              'h-4': controlSize === 'sm',
            })}
          />
        </button>
        <div className="flex flex-row gap-3">
          {carouselChildren.map((_, index) => {
            return (
              <CarouselDot
                active={index == activeIndex}
                key={index}
                controlSize={controlSize}
                variant={variant}
              />
            )
          })}
        </div>
        <button
          onClick={() => updateIndex(activeIndex + 1)}
          disabled={activeIndex == carouselChildren.length - 1}
        >
          <ChevronRightIcon
            className={clsx('stroke-current', {
              'text-black/20': activeIndex == carouselChildren.length - 1,
              'text-black': activeIndex != carouselChildren.length - 1,
              'h-9': controlSize === 'lg',
              'h-4': controlSize === 'sm',
            })}
          />
        </button>
      </div>
    </div>
  )
}

export default Carousel
