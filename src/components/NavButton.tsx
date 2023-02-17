import type { FC } from 'react'
import React from 'react'

interface Nav {
  title: string
  onPage: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const NavButton: FC<Nav> = ({ title, onPage, onClick }) => {
  return (
    <div className="flex flex-row">
      <button className="" onClick={onClick}>
        {title}
      </button>
      <div></div>
    </div>
  )
}

export default NavButton
