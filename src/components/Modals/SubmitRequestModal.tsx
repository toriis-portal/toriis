import React, { useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import PrimaryButton from '../Buttons/PrimaryButton'

import GeneralModal from './GeneralModal'

// interface ModalProps {
// isOpen: boolean
// }

export const SubmitRequestModal: FC = ({}) => {
  const flexStyles = clsx('flex flex-col items-center')
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div onClick={() => setIsOpen(false)}>
      <GeneralModal
        isOpen={isOpen}
        className={clsx(
          'w-3/5 justify-evenly gap-2 py-8 px-12 sm:flex-[0_0_35%]',
          flexStyles,
        )}
      >
        <p className="header-3 w-4/5 text-center font-medium text-black ">
          Submit Request
        </p>

        <label htmlFor="comments">
          <p>
            Comments <span className="text-medGray">(Optional)</span>
          </p>
          <input
            type="text"
            name="comments"
            id="comments"
            className="mb-4 block h-32 w-[507px] rounded"
          />
        </label>

        <PrimaryButton
          text="Submit Request"
          link={''}
          className="flex items-center justify-center !px-14 !py-4 text-center !font-medium"
        />
      </GeneralModal>
    </div>
  )
}

export default SubmitRequestModal
