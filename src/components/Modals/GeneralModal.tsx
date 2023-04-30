import React, { useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

interface GeneralModalProps {
  isOpen: boolean
  isOpenCallBack?: (isOpen: boolean) => void
  className?: string
  children?: React.ReactNode
  closeOnOutsideClick?: boolean
}

export const GeneralModal: FC<GeneralModalProps> = ({
  isOpen,
  className,
  children,
  closeOnOutsideClick = false,
  isOpenCallBack
}) => {

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.5)]"
          onClick={() => { isOpenCallBack && isOpenCallBack(false) }}
        >
          <div
            className={clsx(
              'z-20 rounded-xl border-[1px]',
              'border-black bg-white',
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default GeneralModal
