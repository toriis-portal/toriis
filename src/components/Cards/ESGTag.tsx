import type { FC } from 'react'

import { envGradeToColor } from '../../utils/helpers'
import { envGradeEnum } from '../../utils/enums'

interface TagProps {
  grade: string | undefined
}

const ESGTag: FC<TagProps> = ({ grade }) => {
  let display = grade
  if (!grade || !Object.values(envGradeEnum).includes(grade)) {
    display = 'N/A'
  }
  return (
    <div
      className={`flex ${envGradeToColor(
        grade,
      )} header-2 aspect-square max-w-fit items-center rounded-xl text-center leading-8 text-white`}
    >
      <div className="w-[109px] align-middle">{display}</div>
    </div>
  )
}

export default ESGTag
