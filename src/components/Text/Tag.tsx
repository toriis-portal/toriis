import clsx from 'clsx'
import type { FC } from 'react'

interface TagProps {
  title: string
  className: string
}

const Tag: FC<TagProps> = ({ title, className }) => {
  return (
    <div
      className={clsx(
        'flex max-h-8 w-fit justify-center rounded-full px-[18px]',
        'truncate text-lg font-medium',
        className,
      )}
    >
      {title}
    </div>
  )
}

export default Tag
