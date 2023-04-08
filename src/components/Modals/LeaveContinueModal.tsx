import React from 'react'
import type { FC } from 'react'

interface ModalProps {
  onLeave: () => void // function to close modal and leave page
  onContinue: () => void // function to close modal (and remain on page)
}

// to use modal, conditionally render it with {(popup == true) && <LeaveContinueModal/>}
// to continue editing, onContinue should set popup = false to undisplay modal
// to leave page, onLeave should set popup = false and then handle page navigation as needed
export const LeaveContinueModal: FC<ModalProps> = ({ onLeave, onContinue }) => {
  return (
    <>
      <div className="flex h-[250px] w-[500px] flex-col items-center justify-evenly rounded-xl border-[1px] border-black py-8 text-center text-base">
        <p className="text-lg font-semibold text-pumpkin">
          Are you sure you want to move to another page?
        </p>

        <p className="mx-20 font-medium text-black">
          Moving to another page before requesting review can cause changes to
          be lost.
        </p>

        <div className="flex h-[34px] flex-row gap-8 font-[400] text-white">
          <button
            className="w-[155px] rounded-full bg-clementine"
            onClick={onLeave}
          >
            Leave Page
          </button>
          <button
            className="w-[155px] rounded-full bg-cobalt"
            onClick={onContinue}
          >
            Continue Editing
          </button>
        </div>
      </div>
    </>
  )
}

export default LeaveContinueModal
