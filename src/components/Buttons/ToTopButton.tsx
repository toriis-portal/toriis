import type { FC } from 'react'
import React from 'react'
import { animateScroll } from 'react-scroll'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

interface animateScrollType {
  animateTopScroll: (
    y: number,
    options: unknown,
    to: string,
    target: unknown,
  ) => void
  getAnimationType: (options: {
    smooth: boolean | string
  }) => (x: number) => number
  scrollToTop: (options: unknown) => void
  scrollToBottom: (options?: unknown) => void
  scrollTo: () => void
  scrollMore: () => void
}

const ToTopButton: FC = () => {
  const typedAnimateScroll = animateScroll as animateScrollType
  return (
    <button
      onClick={typedAnimateScroll.scrollToTop}
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-white p-3 shadow-md"
    >
      <ArrowUpIcon className="stroke-current stroke-1" />
    </button>
  )
}

export default ToTopButton
