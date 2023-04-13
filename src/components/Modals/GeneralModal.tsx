import React from 'react'
import type { FC } from 'react'

interface GeneralModalProps {
  isOpen: boolean // state variable for displaying modal
  styles: string
  children: JSX.Element | undefined | null
}

export const GeneralModal: FC<GeneralModalProps> = ({
  isOpen = true,
  styles = '',
  children,
}) => {
  const defaultStyles =
    'h-1/4 w-1/4 rounded-xl border-[1px] border-black bg-white '
  const modalStyles = defaultStyles + styles
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.5)]">
          <div className={modalStyles}>{!!children && children}</div>
        </div>
      )}
    </>
  )
}

export default GeneralModal
