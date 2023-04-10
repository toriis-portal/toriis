import React, { useEffect } from 'react'
import type { FC } from 'react'
import { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onLeave: () => void // function to close modal and leave page
  onContinue: () => void // function to close modal (and remain on page)
}

// to use modal, conditionally render it with {(popup == true) && <LeaveConfirmationModal/>}
// to continue editing, onContinue should set popup = false to undisplay modal
// to leave page, onLeave should set popup = false and then handle page navigation as needed
export const LeaveConfirmationModal: FC<ModalProps> = ({
  isOpen = true,
  onLeave,
  onContinue,
}) => {
  const [display, setDisplay] = useState(isOpen)

  //
  useEffect(() => {
    setDisplay(isOpen)
  }, [isOpen])

  return (
    <>
      {display && (
        <div className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,.5)]">
          <div className="mt-12 flex h-max w-min flex-col items-center justify-evenly rounded-xl border-[1px] border-black bg-white py-8 text-center text-base">
            <p className="text-lg font-semibold text-pumpkin">
              Are you sure you want to move to another page?
            </p>

            <p className="mx-20 font-medium text-black">
              Moving to another page before requesting review can cause changes
              to be lost.
            </p>

            <div className="flex h-1/5 w-full flex-row justify-center gap-8 text-white">
              <button
                className="w-2/6 rounded-full bg-clementine"
                onClick={() => {
                  setDisplay(false)
                  onLeave
                }}
              >
                Leave Page
              </button>
              <button
                className="w-2/6 rounded-full bg-cobalt"
                onClick={() => {
                  setDisplay(false)
                  onContinue
                }}
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LeaveConfirmationModal
