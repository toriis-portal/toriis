import type { FC } from 'react'

interface TagProps {
  title: string
}

const Tag: FC<TagProps> = ({ title }) => {
  return (
    <div className="flex max-w-fit rounded-full bg-lightBlue px-[22px] py-0 text-lg font-medium">
      {title}
    </div>
  )
}

export default Tag
