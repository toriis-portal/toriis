import React from 'react'
import type { FC } from 'react'

import GeneralModal from './GeneralModal'

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

  const modalStyles =
    'h-2/5 w-3/5 flex flex-col sm:flex-[0_0_35%] gap-2 py-4 items-center justify-evenly '

  const text1 = (
    <p className="px-2 text-center  text-xs font-semibold text-pumpkin sm:text-base ">
      Are you sure you want to move to another page?
    </p>
  )

  const text2 = (
    <p className="w-4/5 text-center text-sm font-medium text-black sm:text-base ">
      Moving to another page before requesting review can cause changes to be
      lost.
    </p>
  )

  const buttonsDivStyles =
    'flex-col gap-2 w-full flex sm:flex-row sm:gap-[4%] justify-center items-center'

  const buttonStyles =
    'text-xs font-normal h-8 w-3/5 min-[380px]:w-2/5 sm:text-xs min-[800px]:text-base sm:flex-[0_1_140px] sm:w-2/5  mx-1 rounded-full text-white '

  const buttons = (
    <div className={buttonsDivStyles}>
      <button className={'bg-clementine ' + buttonStyles} onClick={leavePage}>
        Leave Page
      </button>

      <button className={'bg-cobalt ' + buttonStyles} onClick={continueEditing}>
        Continue Editing
      </button>
    </div>
  )

  return (
    <>
      <GeneralModal isOpen={isOpen} styles={modalStyles}>
        <>
          {text1}
          {text2}
          {buttons}
        </>
      </GeneralModal>
    </>
  )
}

export default LeaveConfirmationModal
