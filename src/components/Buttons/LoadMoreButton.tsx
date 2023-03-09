import type { FC, MouseEvent } from 'react'
import clsx from 'clsx'

interface LoadMoreButtonProps {
  onClick: MouseEvent<HTMLButtonElement>
  disabled: boolean
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      className={clsx(
        'ml-7 font-klima text-[28px] font-medium',
        'rounded border-2 border-solid border-clementine',
        'rounded bg-white px-7 py-3.5',
        'shadow-[-8px_8px_0px_0px] shadow-clementine',
        'active:shadow-[-12px_12px_0px_0px] active:shadow-clementine',
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
