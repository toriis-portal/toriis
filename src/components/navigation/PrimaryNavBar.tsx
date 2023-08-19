import type { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from 'flowbite-react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { AuthButton } from '../index'
import toriisLogo from '../../../public/toriis.png'

interface NavButtonProps {
  title: string
  link: string
}

const NavButton: FC<NavButtonProps> = ({ title, link }) => {
  const isActive = useRouter().pathname === link

  return (
    <Link
      href={link}
      className={clsx(
        'border-b-4 bg-white py-2 text-center text-black',
        {
          'border-cobalt': isActive,
          'border-white': !isActive,
        },
        'header-3 text-[20px] hover:border-b-4 hover:border-cobalt hover:duration-100',
      )}
    >
      {title}
    </Link>
  )
}

const PrimaryNavBar: FC = () => {
  return (
    <div className="sticky top-0 z-40 px-4 md:static">
      <Navbar fluid={true} rounded={true}>
        <Link href="/home">
          <Image
            src={toriisLogo as HTMLImageElement}
            className="my-3 h-12 w-auto"
            alt="TORIIS Logo"
          />
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <NavButton title="Home" link="/home" />
          <NavButton title="Take Action" link="/take-action" />
          <NavButton title="Fossil Fuels" link="/fossil-fuel" />
          <NavButton title="Learn about Investments" link="/investments" />
          <div className="hidden w-fit flex-col justify-center md:flex">
            <AuthButton />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default PrimaryNavBar
