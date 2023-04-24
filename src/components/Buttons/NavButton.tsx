import type { FC } from 'react'
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

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
        't3 hover:border-b-4 hover:border-cobalt hover:duration-100',
      )}
    >
      {title}
    </Link>
  )
}

export default NavButton
