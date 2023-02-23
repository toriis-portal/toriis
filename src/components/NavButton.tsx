import type { FC } from 'react'
import React from 'react'

interface Nav {
  title: string
  onPage: boolean
  link: string
}

const NavButton: FC<Nav> = ({ title, onPage, link }) => {
  return onPage ? (
    <div className="flex flex-col gap-1 bg-white">
      <a
        href={link}
        className="m-0 pl-3 pr-4 text-center font-klima font-medium text-black"
      >
        {title}
      </a>
      <div className=" border-2 border-colbalt" />
    </div>
  ) : (
    <div className="flex flex-col gap-1 bg-white">
      <a
        href={link}
        className="m-0 pl-3 pr-4 text-center font-klima font-medium text-black"
      >
        {title}
      </a>
    </div>
  )
}

export default NavButton
