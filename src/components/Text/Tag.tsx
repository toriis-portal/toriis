import type { FC } from 'react'

interface TagProps {
  title: string
  backgroundColor: string
  textColor: string
}

const Tag: FC<TagProps> = ({ title, backgroundColor, textColor }) => {
  return (
    <div
      className={`flex justify-center rounded-full bg-${backgroundColor} text-${textColor} w-fit px-[18px] py-0 text-lg font-medium`}
    >
      {title}
    </div>
  )
}

export default Tag
