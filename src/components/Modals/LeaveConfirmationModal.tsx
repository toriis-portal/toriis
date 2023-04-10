import React from 'react'
import type { FC } from 'react'

interface ModalProps {
  isOpen: boolean // state variable for displaying modal
  setIsOpen: () => void // set state variable for closing modal
  onLeave?: () => void // function to leave page
}

// modal conditionally renders itself, but parent component must pass in
// 1. a state variable that controls whether or not the modal pops up
// 2. a set state variable function that this component uses to close the modal for BOTH options (leave and continue)
// 3. leave page functionality ONLY
export const LeaveConfirmationModal: FC<ModalProps> = ({
  isOpen, // ex: const [isOpen, setIsOpen] = useState(initialState=false)
  setIsOpen, // ex: setIsOpen(!isOpen)
  onLeave = () =>
    (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'), // leave page functionality ONLY -> do not include close modal functionality (setIsOpen(false))
}) => {
  const continueEditing = setIsOpen // close modal to continue editing at parent level

  const leavePage = () => {
    setIsOpen() // close modal before leaving page at parent level
    onLeave() // leave page
  }

  return (
    <>
      {isOpen && (
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
                onClick={leavePage}
              >
                Leave Page
              </button>

              <button
                className="w-2/6 rounded-full bg-cobalt"
                onClick={continueEditing}
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
