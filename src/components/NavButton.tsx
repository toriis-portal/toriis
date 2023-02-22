import type { FC } from 'react'
import React from 'react'

interface Nav {
  title: string
  onPage: boolean
  link: string
}

const NavButton: FC<Nav> = ({ title, onPage, link }) => {
  return (
    <div className="flex flex-col gap-1 bg-white">
      <li className="">
        <a
          href={link}
          className="m-0 py-2 pl-3 pr-4 font-klima font-extralight text-black"
        >
          {title}
        </a>
      </li>
      <li className="">
        <a
          href={link}
          className="m-0 py-2 pl-3 pr-4 font-klima font-light text-black"
        >
          {title}
        </a>
      </li>
      <div className=" border-2 border-colbalt" />
    </div>
  )
}

export default NavButton
