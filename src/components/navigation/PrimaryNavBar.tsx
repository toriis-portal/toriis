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
        'bg-darkTeal py-2 pl-6 text-white md:border-b-4 md:bg-white md:pl-0 md:text-center md:text-black',
        {
          'underline decoration-clementine underline-offset-4 md:border-cobalt md:no-underline':
            isActive,
          'md:border-white': !isActive,
        },
        'header-3 text-[20px] md:hover:border-b-4 md:hover:border-cobalt md:hover:duration-100',
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
        <Navbar.Toggle className="z-50" />
        <Navbar.Collapse className="absolute top-0 left-20 h-[130vh] bg-darkTeal pt-24 md:static md:h-fit md:bg-white md:pt-0">
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
