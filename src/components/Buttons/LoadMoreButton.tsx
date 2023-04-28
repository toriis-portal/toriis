import type { FC } from 'react'
import clsx from 'clsx'

interface LoadMoreButtonProps {
  onClick: () => void
  disabled: boolean
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={clsx(
        'rounded border-2 border-solid border-clementine bg-white',
        'm-6 px-20 py-3',
        'shadow-[-8px_8px_0px_0px] shadow-clementine',
        'hover:shadow-[-5px_5px_0px_0px] hover:shadow-clementine',
        `${disabled ? 'hidden' : ''}`,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      Load More
    </button>
  )
}

export default LoadMoreButton
