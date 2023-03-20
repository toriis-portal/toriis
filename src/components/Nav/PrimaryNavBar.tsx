import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from 'flowbite-react'

import { NavButton } from '../index'
import toriisimg from '../../../public/toriis.png'

const PrimaryNavBar: FC = () => {
  return (
    <Navbar fluid={true} rounded={true} className="px-4 sm:py-0.5 sm:px-14">
      <Link href="/home">
        <Image
          src={toriisimg as HTMLImageElement}
          className="mr-3 h-14 w-auto sm:h-20"
          alt="Toriis Logo"
        />
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <NavButton title="Home" link="/home" />
        <NavButton title="Fossil Fuel" link="/fossil-fuel" />
        <NavButton title="Learn about Investments" link="/investments" />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default PrimaryNavBar
