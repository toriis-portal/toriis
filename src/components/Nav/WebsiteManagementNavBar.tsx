import type { FC } from 'react'
import Link from 'next/link'

import { BackButton, AuthButton } from '../../components'

interface NavItem {
  path: string
  text: string
  active: boolean
}

const WebsiteManagementNavBar: FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b-[3px] border-cobalt px-10 py-8">
      <div className="h-10">
        <BackButton />
      </div>
      <div className="flex flex-row space-x-12">
        {navItems.map((navItem: NavItem, i: number) => {
          return (
            <Link key={i} href={navItem.path}>
              <p className="text-[22px] font-medium">{navItem.text}</p>
              <div
                className={`relative right-[1.3rem] z-0 h-2 ${
                  navItem.active ? 'bg-clementine' : ''
                }`}
              />
            </Link>
          )
        })}
      </div>
      <div className="flex w-fit flex-col justify-center">
        <AuthButton />
      </div>
    </div>
  )
}
export default WebsiteManagementNavBar
