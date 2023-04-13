import type { FC } from 'react'

interface AdminBoxProps {
  title: string,
  description: string 
}

const NetAssetTag: FC<AdminBoxProps> = ({ title, description }) => {
  return (
  <div className=" shadow-md border border-black rounded-lg w-[25rem] h-[17rem] py-[20%] text-center">
    <div className="my-auto flex flex-col justify-around h-full">
      <div className="text-xl font-medium">
        {title}
      </div>
      <br/>
      <div className="text-l font-semi">
        {description}
      </div>
    </div>
  </div>

  )
}

export default NetAssetTag
