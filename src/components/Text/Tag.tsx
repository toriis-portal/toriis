import type { FC } from 'react'

interface TagProps {
  title: string
}

const Tag: FC<TagProps> = ({ title }) => {
  return (
    <div className="flex justify-center rounded-full bg-lightBlue px-[18px] py-0 text-lg font-medium">
      {title}
    </div>
  )
}

export default Tag
