import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'

import { NavButton } from '../components'

import toriisimg from './/../img/toriis.png'

const NavBar: FC = () => {
  return (
    <nav className="bg-white">
      <div className="flex flex-row items-center justify-between px-10">
        <a href="link to main page" className="justify-start">
          <Image
            src={toriisimg as HTMLImageElement}
            className=""
            alt="Toriis Logo"
            height="100"
            width="100"
          />
        </a>
        <div className="justify-end">
          <div className="flex flex-row pb-1">
            <NavButton title="Home" link="/" />
            <NavButton title="Fossil Fuel" link="/fossil-fuel" />
            <NavButton title="Learn about Investments" link="/investments" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
