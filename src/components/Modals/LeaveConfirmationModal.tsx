import React from 'react'
import type { FC } from 'react'

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

  return (
    <GeneralModal
      isOpen={isOpen}
      className="flex h-2/5 w-3/5 flex-col items-center justify-evenly gap-2 py-4 sm:flex-[0_0_35%]"
    >
      <p className="px-2 text-center  text-xs font-semibold text-pumpkin sm:text-base ">
        Are you sure you want to move to another page?
      </p>
      <p className="w-4/5 text-center text-sm font-medium text-black sm:text-base ">
        Moving to another page before requesting review can cause changes to be
        lost.
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:gap-[4%]">
        <button
          className="mx-1 h-8 w-3/5 rounded-full bg-clementine text-xs font-normal text-white min-[380px]:w-2/5 sm:w-2/5  sm:flex-[0_1_140px] sm:text-xs min-[800px]:text-base "
          onClick={leavePage}
        >
          Leave Page
        </button>

        <button
          className="mx-1 h-8 w-3/5 rounded-full bg-cobalt text-xs font-normal text-white min-[380px]:w-2/5 sm:w-2/5  sm:flex-[0_1_140px] sm:text-xs min-[800px]:text-base "
          onClick={continueEditing}
        >
          Continue Editing
        </button>
      </div>
    </GeneralModal>
  )
}

export default LeaveConfirmationModal
