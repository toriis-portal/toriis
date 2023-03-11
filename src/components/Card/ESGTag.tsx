import type { FC } from 'react'
import clsx from 'clsx'

interface TagProps {
  grade: string | undefined
}

const ESGTag: FC<TagProps> = ({ grade }) => {
    let display = grade
    if(grade === undefined || grade.length === 0 || (grade.charAt(0) !== 'A' && grade.charAt(0) !== 'B' && grade.charAt(0) !== 'C'))
    {
        display = "N/A"
    }
  return (
    <div
      className={clsx(
        'flex aspect-square max-w-fit items-center rounded-xl text-center text-[28px] font-medium leading-8 text-white',
        {
          'bg-brightTeal': grade?.charAt(0) === 'A',
          'bg-clementine': grade?.charAt(0) === 'B',
          'bg-pumpkin': grade?.charAt(0) === 'C',
          'bg-lightGray' : display == "N/A",
        },
      )}
    >
      <div className="w-[109px] align-middle">{display}</div>
    </div>
  )
}

export default ESGTag
