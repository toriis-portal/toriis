import type { FC } from 'react'
import clsx from 'clsx'

const LoadMoreButton = () => {
  return (
    <button
      className={clsx(
        'ml-7 font-klima text-[28px] font-medium',
        'rounded border-2 border-solid border-clementine',
        'rounded bg-white px-7 py-3.5',
        'shadow-[-8px_8px_0px_0px] shadow-clementine',
      )}
    >
      Load More
    </button>
  )
}

export default LoadMoreButton
