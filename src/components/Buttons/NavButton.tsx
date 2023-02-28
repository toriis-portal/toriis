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
        'm-0 border-b-4 bg-white px-6 py-1 text-center font-klima text-[20px] font-medium text-black',
        {
          'border-cobalt': isActive,
          'border-white': !isActive,
        },
      )}
    >
      {title}
    </Link>
  )
}

export default NavButton
