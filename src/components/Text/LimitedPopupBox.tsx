import clsx from 'clsx'
import type { FC } from 'react'
import { useRef, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

import GeneralModal from '../Modals/GeneralModal'

interface LimitedPopupProps {
  text: string
}

const LimitedPopupBox: FC<LimitedPopupProps> = ({ text }) => {
  const commentRef = useRef<HTMLParagraphElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const p = commentRef.current
    if (p && p.scrollWidth > p.clientWidth) {
      setIsOverflowing(true)
    } else {
      setIsOverflowing(false)
    }
  }, [])

  return (
    <div className="flex gap-2 border border-lightGray p-1">
      <GeneralModal isOpen={isOpen}>
        <button
          onClick={() => setIsOpen(false)}
          className="relative -inset-x-4 inset-y-4 float-right"
        >
          <XMarkIcon className="h-auto w-5 stroke-2" />
        </button>
        <div className="text-md my-10 h-[15vh] w-[85vw] overflow-y-auto px-10">
          {text}
        </div>
      </GeneralModal>
      <p ref={commentRef} className="w-[90%] truncate">
        {text}
      </p>
      <button onClick={() => setIsOpen(true)}>
        <u
          className={clsx(
            'w-[10&] font-inter text-xs font-light italic text-lightGray',
            { hidden: !isOverflowing },
          )}
        >
          see more
        </u>
      </button>
    </div>
  )
}

export default LimitedPopupBox
