import type { FC } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BackButton, AuthButton, HighlightedTitle } from '..'

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

  if (adminPage == 'adminMain') {
    centerElem = (
      <div className="mt-10 lg:-ml-36">
        <HighlightedTitle
          title="Administration Control"
          size="large"
          color="clementine"
        />
      </div>
    )
  }

  if (adminPage == 'websiteManagement') {
    centerElem = (
      <div className="my-11 flex space-x-12 lg:-ml-20">
        {navItems.map((navItem: NavItem, i: number) => {
          const isActive = path === '' + navItem.path
          return (
            <Link key={i} href={navItem.path}>
              <p className="text-[22px] font-medium">{navItem.text}</p>
              <div className={clsx('z-0 h-2', isActive && 'bg-clementine')} />
            </Link>
          )
        })}
      </div>
    )
  }

  if (adminPage == 'requestManagement') {
    centerElem = (
      <div className="mt-10 lg:-ml-24">
        <HighlightedTitle
          title="Requests Management"
          size="large"
          color="clementine"
        />
      </div>
    )
  }

  if (adminPage == 'adminManagement') {
    centerElem = (
      <div className="mt-10 lg:-ml-24">
        <HighlightedTitle
          title="Administrative Management"
          size="large"
          color="clementine"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border-b-[3px] border-cobalt px-10">
      <div className="h-10">
        {adminPage == 'adminMain' ? (
          <BackButton customLink="/home" customText="Back To Toriis" />
        ) : (
          <BackButton customLink="/admin" />
        )}
      </div>
      {centerElem}
      <AuthButton />
    </div>
  )
}
export default AdminNavBar
