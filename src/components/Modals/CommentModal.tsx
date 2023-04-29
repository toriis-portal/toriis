import clsx from 'clsx'
import type { FC } from 'react'
import { useRef, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'

import GeneralModal from './GeneralModal'

interface CommentModalProps {
  text: string
}

const CommentModal: FC<CommentModalProps> = ({ text }) => {
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
    <div className="body-normal flex flex-row justify-between gap-2 border border-lightGray px-4 py-0.5">
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
      <p ref={commentRef} className="basis-5/6 truncate">
        {text}
      </p>
      <button onClick={() => setIsOpen(true)}>
        <u
          className={clsx(
            'basis-1/6 truncate text-xs font-light italic text-footnoteGray',
            { hidden: !isOverflowing },
          )}
        >
          see more
        </u>
      </button>
    </div>
  )
}

export default CommentModal
