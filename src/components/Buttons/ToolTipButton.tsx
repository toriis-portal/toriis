import type { FC } from 'react'
import clsx from 'clsx'
import { useState } from 'react'
interface TitleProps {
  type: 'sector' | 'industry' | 'net asset sum' | 'environmental grade'
}

const ToolTip: FC<TitleProps> = ({ type }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setIsTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setIsTooltipVisible(false)
  }

  return (
    <>
      <div className="mb-12 ml-[1.4rem] w-fit">
        <button
          data-tooltip-target="tooltip-top"
          data-tooltip-placement="bottom"
          type="button"
          className="mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mb-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {type}
        </button>
        <div
          id="tooltip-bottom"
          role="tooltip"
          className={clsx(
            'absolute',
            'z-10',
            'inline-block',
            'px-3',
            'py-2',
            'text-sm',
            'font-medium',
            'text-white',
            'bg-gray-900',
            'rounded-lg',
            'shadow-sm',
            'tooltip',
            'dark:bg-gray-700',
            {
              'opacity-0': !isTooltipVisible,
              'opacity-100': isTooltipVisible,
            },
          )}
        >
          Tooltip on bottom
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </>
  )
}

export default ToolTip
