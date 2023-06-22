import React, { useState } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'

import PrimaryButton from '../button/PrimaryButton'

import GeneralModal from './GeneralModal'

interface SubmitRequestModalProps {
  isOpen: boolean
  isOpenCallBack?: (isOpen: boolean) => void
  onSubmit: (comment: string) => void
}

export const SubmitRequestModal: FC<SubmitRequestModalProps> = ({
  isOpen,
  isOpenCallBack,
  onSubmit,
}) => {
  const flexStyles = clsx('flex flex-col items-center')
  const [comment, setComment] = useState('')

  return (
    <GeneralModal
      isOpen={isOpen}
      isOpenCallBack={isOpenCallBack}
      closeOnOutsideClick={true}
      className={clsx(
        'justify-evenly gap-2 px-12 pt-8 pb-10 sm:flex-[0_0_35%]',
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
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      <PrimaryButton
        text="Submit Request"
        className="mt-4 flex items-center justify-center !px-12 !py-2"
        onClick={() => {
          onSubmit(comment)
          isOpenCallBack && isOpenCallBack(false)
        }}
      />
    </GeneralModal>
  )
}

export default SubmitRequestModal
