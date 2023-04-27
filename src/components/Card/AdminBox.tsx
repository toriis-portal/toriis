import type { FC } from 'react'
import Link from 'next/link'

interface AdminBoxProps {
  title: string
  description: string
  link: string
}

const NetAssetTag: FC<AdminBoxProps> = ({ title, description, link }) => {
  return (
    <Link href={link}>
      <div className="mb-5 h-[17rem] w-[25rem] rounded-lg border border-black py-[20%] text-center shadow-md hover:border-2 hover:border-cobalt">
        <div className="my-auto flex h-full flex-col justify-around">
          <div className="header-3">{title}</div>
          <br />
          <div className=" px-4 leading-6">{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default NetAssetTag
