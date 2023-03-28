import type { FC } from 'react'

interface TagProps {
  title: string
  className: string
}

const Tag: FC<TagProps> = ({ title, className }) => {
  return (
    <div
      className={`flex justify-center rounded-full ${className} w-fit px-[18px] py-0 text-lg font-medium`}
    >
      {title}
    </div>
  )
}

export default Tag
