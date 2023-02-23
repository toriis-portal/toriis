import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

import { NavButton } from '../components'

import toriisimg from './/../img/toriis.png'

const NavBar: FC = () => {
  const img: StaticImageData = toriisimg
  return (
    <nav className="bg-white">
      <div className="flex flex-row items-center justify-between px-12">
        <a href="link to main page" className="justify-start">
          <Image
            src={img}
            className=""
            alt="Toriis Logo"
            height="120"
            width="120"
          />
        </a>
        <div className="flex" />
        <div className="justify-end">
          <div className="flex flex-row pb-1">
            <NavButton title="Home" onPage={false} link="#" />
            <NavButton title="Fossil Fuel" onPage={true} link="#" />
            <NavButton
              title="Learn about Investments"
              onPage={false}
              link="#"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
