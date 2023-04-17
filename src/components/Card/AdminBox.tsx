import type { FC } from 'react'
import Link from 'next/link'
interface AdminBoxProps {
  title: string,
  description: string 
  link: string
}

const NetAssetTag: FC<AdminBoxProps> = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="border border-black hover:border-2 hover:border-cobalt rounded-lg w-[25rem] h-[17rem] py-[20%] text-center shadow-md ">
        <div className="my-auto flex flex-col justify-around h-full">
          <div className="text-xl font-medium">
            {title}
          </div>
          <br/>
          <div className="text-l">
            {description}
          </div>
        </div>
      </div>
    </Link>


  )
}

export default NetAssetTag
