import type { FC } from 'react'

interface AdminBoxProps {
  title: string,
  description: string 
}

const NetAssetTag: FC<AdminBoxProps> = ({ title, description }) => {
  return (
  <div className="border border-black hover:border-2 hover:border-cobalt rounded-lg w-[25rem] h-[17rem] py-[20%] text-center shadow-md ">
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
