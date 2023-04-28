import React from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import GeneralModal from './GeneralModal'

interface ModalProps {
  isOpen: boolean
  setIsOpen: () => void
  onLeave?: () => void
}

export const LeaveConfirmationModal: FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  onLeave = () =>
    (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
}) => {
  const continueEditing = setIsOpen

  const leavePage = () => {
    setIsOpen()
    onLeave()
  }

  const buttonStyles = clsx(
    'mx-1 h-8 w-3/5 rounded-full bg-cobalt body-small',
    'text-white min-[380px]:w-2/5 sm:w-2/5',
    'sm:flex-[0_1_140px] sm:body-small min-[800px]:body-normal',
  )

  const flexStyles = clsx('flex flex-col items-center')

  return (
    <GeneralModal
      isOpen={isOpen}
      className={clsx(
        'h-2/5 w-3/5 justify-evenly gap-2 py-4 sm:flex-[0_0_35%]',
        flexStyles,
      )}
    >
      <p className="body-small sm:body-normal px-2 text-center font-semibold text-pumpkin ">
        Are you sure you want to move to another page?
      </p>
      <p className="body-small sm:body-normal w-4/5 text-center font-medium text-black ">
        Moving to another page before requesting review can cause changes to be
        lost.
      </p>
      <div
        className={clsx(
          'w-full justify-center gap-2 sm:flex-row sm:gap-[4%]',
          flexStyles,
        )}
      >
        <button
          className={clsx('bg-clementine', buttonStyles)}
          onClick={leavePage}
        >
          Leave Page
        </button>
        <button
          className={clsx('bg-cobalt', buttonStyles)}
          onClick={continueEditing}
        >
          Continue Editing
        </button>
      </div>
    </GeneralModal>
  )
}

export default LeaveConfirmationModal
