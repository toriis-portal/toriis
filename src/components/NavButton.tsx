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
    <div className="flex flex-col gap-1 bg-white">
      <Link
        href={link}
        className={clsx(
          'm-0 px-4 text-center font-klima font-medium text-black',
          {
            'border-b-4 border-cobalt': isActive,
          },
        )}
      >
        {title}
      </Link>
    </div>
  )
}

export default NavButton
