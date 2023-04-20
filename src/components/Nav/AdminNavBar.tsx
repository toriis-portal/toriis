import type { FC } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BackButton, AuthButton } from '..'

interface NavItem {
  path: string
  text: string
}

const navItems = [
  { path: '/admin/website/data', text: 'Update Database' },
  { path: '/admin/website/content', text: 'Update Text Content' },
]

const AdminNavBar: FC<{ adminPage: string }> = ({ adminPage }) => {
  const path = useRouter().pathname

  let centerElem
  if (adminPage == 'websiteManagement') {
    centerElem = (
      <div className="flex space-x-12">
        {navItems.map((navItem: NavItem, i: number) => {
          const isActive = path === '' + navItem.path
          console.log(path, '' + navItem.path, isActive)
          return (
            <Link key={i} href={navItem.path}>
              <p className="text-[22px] font-medium">{navItem.text}</p>
              <div
                className={clsx(
                  'relative right-[1.3rem] z-0 h-2',
                  isActive && 'bg-clementine',
                )}
              />
            </Link>
          )
        })}
      </div>
    )
  }
  return (
    <div className="flex items-center justify-between border-b-[3px] border-cobalt px-10 py-8">
      <div className="h-10">
        <BackButton />
      </div>
      {centerElem}
      <AuthButton />
    </div>
  )
}
export default AdminNavBar
