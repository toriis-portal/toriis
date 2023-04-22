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

const AdminNavBar: FC = () => {
  const path = useRouter().pathname

  let centerElem

  if (path == '/admin') {
    centerElem = (
      <HighlightedTitle
        title="Administration Control"
        size="large"
        color="clementine"
        padded={false}
      />
    )
  }

  if (path == '/admin/website/data' || path == '/admin/website/content') {
    centerElem = (
      <div className="mt-3 flex space-x-12">
        {navItems.map((navItem: NavItem, i: number) => {
          const isActive = path === '' + navItem.path
          return (
            <Link key={i} href={navItem.path}>
              <p
                className={clsx(
                  'text-[22px] font-medium',
                  isActive &&
                    'underline decoration-clementine decoration-4 underline-offset-8',
                )}
              >
                {navItem.text}
              </p>
            </Link>
          )
        })}
      </div>
    )
  }

  if (path == '/admin/request') {
    centerElem = (
      <HighlightedTitle
        title="Requests Management"
        size="large"
        color="clementine"
        padded={false}
      />
    )
  }

  if (path == '/admin/management') {
    centerElem = (
      <HighlightedTitle
        title="Administrative Management"
        size="large"
        color="clementine"
        padded={false}
      />
    )
  }

  return (
    <div className="flex items-center  border-b-[3px] border-cobalt px-10">
      <div className="h-10 basis-1/4">
        {path == '/admin' ? (
          <BackButton customLink="/home" customText="Back To Toriis" />
        ) : (
          <BackButton customLink="/admin" />
        )}
      </div>
      <div className="mb-10 mt-6 flex basis-2/4 justify-center">
        {centerElem}
      </div>
      <div className="flex basis-1/4 justify-end">
        <AuthButton />
      </div>
    </div>
  )
}
export default AdminNavBar
