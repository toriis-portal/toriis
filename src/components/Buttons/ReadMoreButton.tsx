import type { FC } from 'react'
import clsx from 'clsx'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

interface ReadMoreButtonProps {
  isOpen: boolean
  handleOpen?: () => void
  link?: string
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({
  isOpen,
  handleOpen,
  link,
}) => {
  return (
    <div
      className={clsx(
        'ml-auto flex flex-row items-center rounded-full bg-clementine text-center font-inter',
        {
          'px-4 py-[1px] text-base not-italic': link,
          'px-4 py-1 text-base italic': !link,
        },
      )}
    >
      {link ? (
        <>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {isOpen ? 'Show less' : 'Read more'}
            <ArrowUpRightIcon className="ml-2 mb-[1px] inline h-3.5 w-4 align-self-start stroke-current stroke-1" />
          </a>
        </>
      ) : (
        <>
          <button className="italic" onClick={handleOpen}>
            {isOpen ? 'Show less' : 'Read more'}
          </button>
        </>
      )}
    </div>
  )
}

export default ReadMoreButton
