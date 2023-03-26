import type { FC } from 'react'
import clsx from 'clsx'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import 'flowbite'
interface TitleProps {
  title?: string
  details?: string
  child?: React.ReactNode
}

const ToolTip: FC<TitleProps> = ({ title, details, child }) => {
  return (
    <>
      <div className="group relative inline-block">
        <button
          className={clsx(
            'bg-primary inline-flex rounded py-2 px-[18px]',
            'text-base text-black',
          )}
        >
          <InformationCircleIcon className="w-6" />
        </button>
        <div
          className={clsx(
            'border-light text-body-color absolute top-14 left-1/2',
            '-translate-x-1/2 rounded border border-black bg-white',
            'text-sm font-normal opacity-0 group-hover:opacity-100',
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
          {child ? (
            child
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
