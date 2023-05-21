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

  const renderTitle = () => {
    if (path == '/admin') {
      return (
        <HighlightedTitle
          title="Administration Control"
          size="large"
          color="clementine"
          padded={false}
        />
      )
    } else if (
      path == '/admin/website/data' ||
      path == '/admin/website/content'
    ) {
      return (
        <div className="mt-3 flex space-x-8 lg:space-x-12">
          {navItems.map((navItem: NavItem, i: number) => {
            const isActive = path === navItem.path
            return (
              <Link key={i} href={navItem.path}>
                <p
                  className={clsx(
                    'header-3 whitespace-nowrap',
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
    } else if (path == '/admin/request') {
      return (
        <HighlightedTitle
          title="Requests Management"
          size="large"
          color="clementine"
          padded={false}
        />
      )
    } else if (path == '/admin/management') {
      return (
        <HighlightedTitle
          title="Administrative Management"
          size="large"
          color="clementine"
          padded={false}
        />
      )
    } else if (/^\/admin\/request\/.+/.test(path)) {
      return (
        <HighlightedTitle
          title="Review Database Requests"
          size="large"
          color="clementine"
          padded={false}
        />
      )
    }
  }

  const renderBackButton = () => {
    if (path == '/admin') {
      return <BackButton link="/home" text="Back To Toriis" />
    } else if (path.includes('/admin/request/')) {
      return <BackButton link="/admin/request" />
    } else {
      return <BackButton link="/admin" />
    }
  }

  return (
    <div className="flex items-center  border-b-[3px] border-cobalt px-10">
      <div className="h-10 basis-1/4">{renderBackButton()}</div>
      <div className="mb-8 mt-5 flex basis-2/4 justify-center">
        {renderTitle()}
      </div>
      <div className="flex basis-1/4 justify-end">
        <AuthButton />
      </div>
    </div>
  )
}
export default AdminNavBar
