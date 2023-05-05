import type { FC } from 'react'
import clsx from 'clsx'

import PrimaryButton from './PrimaryButton'

interface LoadMoreButtonProps {
  onClick: () => void
  disabled: boolean
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick, disabled }) => {
  return (
    <PrimaryButton
      text="Load More"
      variant="clementine"
      className={clsx('m-6 !px-20 py-3', { hidden: disabled })}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

export default LoadMoreButton
