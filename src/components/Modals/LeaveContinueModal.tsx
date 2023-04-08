import React from 'react'
import type { FC } from 'react'

interface ModalProps {
  leave: () => void
  cont: () => void
}

export const LeaveContinueModal: FC<ModalProps> = ({
  leave = () => alert('Leave'),
  cont = () => alert('Continue'),
}) => {
  return (
    <>
      <div className="m-2 flex h-[35px] gap-8 text-base font-normal text-white">
        <button
          className="w-[155px] rounded-full bg-clementine text-white"
          onClick={leave}
        >
          <p>Leave Page</p>
        </button>
        <button
          className="w-[155px] rounded-full bg-cobalt text-white "
          onClick={cont}
        >
          <p>Continue Editing</p>
        </button>
      </div>
    </>
  )
}

export default LeaveContinueModal
