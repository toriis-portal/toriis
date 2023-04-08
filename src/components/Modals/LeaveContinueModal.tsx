import React from 'react'
import type { FC } from 'react'

interface ModalProps {
  onLeave: () => void
  onContinue: () => void
}

export const LeaveContinueModal: FC<ModalProps> = ({ onLeave, onContinue }) => {
  return (
    <>
      <div className="h-[250px] w-[500px] flex-col rounded border-[1px] border-black">
        <p className="text-lg font-semibold text-pumpkin">
          Are you sure you want to move to another page?
        </p>

        <p className="flex-col text-base font-medium">
          Moving to another page before requesting review can cause changes to
          be lost.
        </p>
        <div className="h-[34px] gap-8 self-center text-base font-[400] text-white">
          <button
            className="w-[155px] rounded-full bg-clementine"
            onClick={onLeave}
          >
            <p>Leave Page</p>
          </button>
          <button
            className="w-[155px] rounded-full bg-cobalt"
            onClick={onContinue}
          >
            <p>Continue Editing</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default LeaveContinueModal
