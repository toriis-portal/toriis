import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import type { FC } from 'react'

import 'flowbite'

interface ToastProps {
  type: 'success' | 'error'
  message: string
}

const Toast: FC<ToastProps> = ({ type, message }) => {
  return (
    <div
      id="alert-1"
      className="mb-4 flex rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      {type === 'success' && <CheckCircleIcon className="h-5 w-5" />}
      {type === 'error' && <ExclamationCircleIcon className="h-5 w-5" />}
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
        data-dismiss-target="#alert-1"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  )
}

export default Toast
