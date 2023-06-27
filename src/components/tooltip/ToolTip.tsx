import type { FC } from 'react'
import { useState } from 'react'
import clsx from 'clsx'
import 'flowbite'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

interface TitleProps {
  title?: string
  details?: string | React.ReactNode
  children?: React.ReactNode
}

const ToolTip: FC<TitleProps> = ({ title, details, children }) => {
  const [isShown, setIsShown] = useState(false)

  return (
    <div className="group relative flex w-fit justify-center">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <div className={clsx('bg-primary rounded')}>
          <InformationCircleIcon className="w-6" />
        </div>
        {isShown && (
          <div
            className={clsx(
              'border-light absolute top-12 left-1/2 z-20',
              '-translate-x-1/2 rounded-xl border border-black bg-white',
              'body-normal w-60 p-5 leading-4',
            )}
          >
            <span
              className={clsx(
                'absolute -top-4 left-1/2 bottom-7 h-8 w-8',
                '-translate-x-1/2 rotate-45 rounded-sm border-t border-l',
                'body-small border-black bg-white',
              )}
            />
            <div className="body-small">
              <div className="font-bold">{title}</div>
              <div>{details}</div>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ToolTip
