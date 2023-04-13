import React from 'react'
import type { FC } from 'react'

import GeneralModal from './GeneralModal'

interface ModalProps {
  isOpen: boolean // state variable for displaying modal
  setIsOpen: () => void // set state variable for closing modal
  onLeave?: () => void // function to leave page
}

// modal conditionally renders itself, but parent component must pass in the following:
// 1. a state variable that controls whether or not the modal renders
// 2. a set state variable function that this component uses to close the modal for BOTH options (leave and continue)
// 3. leave page functionality ONLY
export const LeaveConfirmationModal: FC<ModalProps> = ({
  isOpen, // ex: const [isOpen, setIsOpen] = useState(initialState=false)
  setIsOpen, // ex: setIsOpen(!isOpen)
  onLeave = () =>
    // leave page functionality ONLY -> do not include close modal functionality (setIsOpen(false))
    (window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
}) => {
  const continueEditing = setIsOpen // close modal to continue editing at parent level

  const leavePage = () => {
    setIsOpen() // close modal before leaving page at parent level
    onLeave() // leave page
  }

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        styles="h-2/5 w-3/5 flex flex-col sm:flex-[0_0_35%] gap-2 py-4 items-center justify-evenly"
      >
        <>
          <p className="px-2 text-center  text-xs font-semibold text-pumpkin sm:text-base ">
            Are you sure you want to move to another page?
          </p>
          <p className="w-4/5 text-center text-sm font-medium text-black sm:text-base ">
            Moving to another page before requesting review can cause changes to
            be lost.
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
        </>
      </GeneralModal>
    </>
  )
}

export default LeaveConfirmationModal
