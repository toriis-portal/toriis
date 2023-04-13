import type { FC } from 'react'

interface AdminBoxProps {
  title: string,
  description: string
}

const NetAssetTag: FC<AdminBoxProps> = ({ title, description }) => {
  return (
    <div className="border border-black rounded-lg w-[25rem] h-[17rem] items-center">
        <div className = "text-xl font-medium text-center">
            {title}
        </div>
        <br/>
        <div className = "text-l font-medium text-center">
            {description}
        </div>
      <div className="flex pb-1 text-[28px] font-medium text-cobalt">
      </div>
    </div>
  )
}

export default NetAssetTag
