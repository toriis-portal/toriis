import type { FC } from 'react'
import { Link } from 'react-scroll'
import clsx from 'clsx'

interface NavItem {
  path: string
  text: string
}

const SecondaryNavBar: FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const navStyle = clsx(
    'no-underline hover:decoration-clementine hover:underline hover:underline-offset-8 hover:decoration-[0.2rem] hover:duration-100',
  )
  return (
    <nav className="center sticky top-0 z-50 bg-darkTeal py-2.5">
      <ul className="flex cursor-pointer flex-row flex-wrap items-center justify-center space-x-8 p-4 text-white">
        {navItems.map((dataKey: { path: string; text: string }, i: number) => {
          return (
            <li key={i}>
              <Link
                activeClass="active"
                to={dataKey.path}
                spy={true}
                smooth={true}
                duration={500}
                className={navStyle}
              >
                {dataKey.text}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SecondaryNavBar
