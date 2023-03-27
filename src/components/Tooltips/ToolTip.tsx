import type { FC } from 'react'
import clsx from 'clsx'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import 'flowbite'

interface TitleProps {
  title?: string
  details?: string
  children?: React.ReactNode
}

const ToolTip: FC<TitleProps> = ({ title, details, children }) => {
  return (
    <>
      <div className="group relative flex justify-center">
        <button className={clsx('bg-primary rounded', 'text-base text-black')}>
          <InformationCircleIcon className="w-6 " />
        </button>
        <div
          className={clsx(
            'border-light text-body-color absolute top-12 left-1/2',
            '-translate-x-1/2 rounded-xl border border-black bg-white',
            'text-sm opacity-0 group-hover:opacity-100',
            'w-60 p-5 leading-4',
          )}
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
              <div className=" font-semibold">{title}:</div>
              {details}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ToolTip
