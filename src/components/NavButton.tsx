import type { FC } from 'react'
import React from 'react'
import { useRouter } from 'next/router'

interface Nav {
  title: string
  link: string
}

const NavButton: FC<Nav> = ({ title, link }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-1 bg-white">
      <a
        href={link}
        className="m-0 px-4 text-center font-klima font-medium text-black"
      >
        {title}
      </a>
      {router.pathname === link ? (
        <div className=" border-2 border-colbalt" />
      ) : (
        <></>
      )}
    </div>
  )
}

export default NavButton
