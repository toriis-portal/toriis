import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  type: 'success' | 'error'
  message: string
}

const Toast: FC<ToastProps> = ({ type, message }) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={clsx(
        'fixed bottom-5 left-5 right-5 z-50 md:left-auto',
        'mb-4 flex flex-row items-center justify-center gap-2 rounded-lg border bg-white p-2',
        {
          'border-clementine': type === 'error',
          'border-cobalt': type === 'success',
        },
        {
          'opacity-0 transition duration-300 ease-in': !show,
          'opacity-100': show,
        },
      )}
    >
      <p
        className={clsx({
          'text-cobalt': type === 'success',
          'text-pumpkin': type === 'error',
        })}
      >
        {type === 'success' && <CheckCircleIcon className="h-6 w-6" />}
        {type === 'error' && <ExclamationCircleIcon className="h-6 w-6" />}
      </p>
      <p>{message}</p>
      <button
        className="ml-10 text-medGray"
        onClick={() => {
          setShow(!show)
        }}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Toast
