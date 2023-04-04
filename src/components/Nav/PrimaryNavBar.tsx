import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from 'flowbite-react'

import { AuthButton, NavButton } from '../index'
import toriisimg from '../../../public/toriis.png'

const PrimaryNavBar: FC = () => {
  return (
    <div className="px-4 sm:px-6">
      <Navbar fluid={true} rounded={true}>
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
          <div className="flex w-fit flex-col justify-center">
            <AuthButton />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default PrimaryNavBar
