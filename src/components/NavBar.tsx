import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { NavButton } from '../components'
import toriisimg from '../../public/toriis.png'

const NavBar: FC = () => {
  return (
    <nav className="flex h-[120px] flex-row items-center justify-between bg-white px-12">
      <Link href="/home" className="h-full w-auto justify-start">
        <Image
          src={toriisimg as HTMLImageElement}
          className="h-full w-auto object-contain"
          alt="Toriis Logo"
        />
      </Link>
      <div className="justify-end">
        <div className="flex flex-row pb-1">
          <NavButton title="Home" link="/home" />
          <NavButton title="Fossil Fuel" link="/fossil-fuel" />
          <NavButton title="Learn about Investments" link="/investments" />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
