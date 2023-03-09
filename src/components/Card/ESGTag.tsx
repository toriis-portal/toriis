import type { FC } from 'react'
import clsx from 'clsx'

interface TagProps {
  grade: string
}

const ESGTag: FC<TagProps> = ({ grade }) => {
  return (
    <div
      className={clsx(
        'flex aspect-square max-w-fit items-center rounded-xl text-center text-[28px] font-medium leading-8 text-white',
        {
          'bg-brightTeal': grade.charAt(0) == 'A',
          'bg-clementine': grade.charAt(0) == 'B',
          'bg-pumpkin': grade.charAt(0) == 'C',
        },
      )}
    >
      <div className="w-[109px] align-middle">{grade}</div>
    </div>
  )
}

export default ESGTag
