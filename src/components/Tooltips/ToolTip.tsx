import type { FC } from 'react'
import clsx from 'clsx'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import 'flowbite'
import { useState } from 'react'

interface TitleProps {
  title?: string
  details?: string | React.ReactNode
  children?: React.ReactNode
}

const ToolTip: FC<TitleProps> = ({ title, details, children }) => {
  const [isShown, setIsShown] = useState(false)

  function handleMouseLeave({
    relatedTarget,
    currentTarget,
  }: {
    relatedTarget: EventTarget | null
    currentTarget: EventTarget
  }) {
    if (
      relatedTarget &&
      !(currentTarget as Element).contains(relatedTarget as Node)
    ) {
      setIsShown(false)
    }
  }

  return (
    <div className="group relative flex w-fit justify-center">
      <button
        className={clsx('bg-primary z-10 rounded text-base text-black')}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={handleMouseLeave}
      >
        <InformationCircleIcon className="w-6" />
      </button>
      {isShown && (
        <div
          className={clsx(
            'border-light text-body-color absolute top-12 left-1/2',
            '-translate-x-1/2 rounded-xl border border-black bg-white',
            'z-40 w-60 p-5 text-sm leading-4',
          )}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className={clsx(
              'absolute -top-4 left-1/2 bottom-7 -z-10 h-8 w-8',
              '-translate-x-1/2 rotate-45 rounded-sm border-t border-l',
              'border-black bg-white',
            )}
          />
          {children ? (
            children
          ) : (
            <>
              <div className="font-semibold">{title}:</div>
              {details}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ToolTip
