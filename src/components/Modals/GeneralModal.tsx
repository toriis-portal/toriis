import React from 'react'
import type { FC } from 'react'

interface GeneralModalProps {
  isOpen: boolean // state variable for displaying modal
  className?: string
  children?: React.ReactNode
}

export const GeneralModal: FC<GeneralModalProps> = ({
  isOpen,
  className,
  children,
}) => {
  const defaultModalStyles =
    'z-20 rounded-xl border-[1px] border-black bg-white '
  const modalStyles: string = className
    ? defaultModalStyles + className
    : defaultModalStyles
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.5)]">
          <div className={modalStyles}>{children}</div>
        </div>
      )}
    </>
  )
}

export default GeneralModal
