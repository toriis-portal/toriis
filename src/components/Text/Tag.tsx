import type { FC } from 'react'

interface TagProps {
  title: string
  additionalStyling: string
}

const Tag: FC<TagProps> = ({ title, additionalStyling }) => {
  return (
    <div
      className={`flex justify-center rounded-full ${additionalStyling} w-fit px-[18px] py-0 text-lg font-medium`}
    >
      {title}
    </div>
  )
}

export default Tag
