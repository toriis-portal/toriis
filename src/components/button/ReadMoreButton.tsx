import type { FC } from 'react'
import clsx from 'clsx'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/solid'
import Link from 'next/link'

interface ReadMoreButtonProps {
  isOpen: boolean
  handleOpen?: () => void
  link?: string
  arrowStyleButton?: boolean
}

const ReadMoreButton: FC<ReadMoreButtonProps> = ({
  isOpen,
  handleOpen,
  link,
  arrowStyleButton = false,
}) => {
  if (arrowStyleButton) {
    return (
      <div>
        {/* Haven't included behavior for when there's a link specified. But design for what this should look like with link was never decided anyways */}
        <button onClick={handleOpen}>
          {isOpen ? (
            <ArrowUpIcon className="h-7 w-7 rounded-full border border-black bg-clementine stroke-current stroke-1 p-1 text-black shadow-lg" />
          ) : (
            <ArrowDownIcon className="h-7 w-7 rounded-full border border-black bg-clementine stroke-current stroke-1 p-1 text-black shadow-lg" />
          )}
        </button>
      </div>
    )
  }
  return (
    <div
      className={clsx(
        'body-normal mt-4 flex flex-row items-center rounded-full bg-clementine text-center sm:ml-auto sm:mt-0',
        {
          'px-4 py-[1px] not-italic': link,
          'px-4 py-1 italic': !link,
        },
      )}
    >
      {link ? (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {isOpen ? 'Show less' : 'Read more'}
          <ArrowUpRightIcon className="align-self-start ml-0.5 inline h-[1em] w-[1em] stroke-current stroke-1" />
        </Link>
      ) : (
        <button className="italic" onClick={handleOpen}>
          {isOpen ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

export default ReadMoreButton
