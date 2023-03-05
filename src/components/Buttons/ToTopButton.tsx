import type { FC } from 'react'
import React from 'react'
import { animateScroll } from 'react-scroll'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

const ToTopButton: FC = () => {
  const scroll = animateScroll

  return (
    <button
      onClick={() => {
        scroll.scrollToTop()
      }}
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-white p-3 shadow-md"
    >
      <ArrowUpIcon className="stroke-current stroke-1" />
    </button>
  )
}

export default ToTopButton
