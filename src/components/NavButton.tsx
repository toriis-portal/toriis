import type { FC } from 'react'
import React from 'react'

interface Nav {
  title: string
  onPage: boolean
  link: string
}

const NavButton: FC<Nav> = ({ title, onPage, link }) => {
  return (
    <div className="flex flex-col gap-1 bg-purple-700">
      <li className="">
        <a
          href={link}
          className="font-size:1.375rem m-0 py-2 pl-3 pr-4 font-bold text-black"
        >
          {title}
        </a>
      </li>
      <div className=" border-2 border-sky-500" />
    </div>
  )
}

export default NavButton
