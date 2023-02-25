import type { FC } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface NavButtonProps {
  title: string
  link: string
}

const NavButton: FC<NavButtonProps> = ({ title, link }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-1 bg-white">
      <Link
        href={link}
        className="m-0 px-4 text-center font-klima font-medium text-black"
      >
        {title}
      </Link>
      {router.pathname === link ? (
        <div className=" border-2 border-colbalt" />
      ) : (
        <></>
      )}
    </div>
  )
}

export default NavButton
