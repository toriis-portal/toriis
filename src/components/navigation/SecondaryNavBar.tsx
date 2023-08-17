import type { FC } from 'react'
import { Link } from 'react-scroll'
import clsx from 'clsx'

interface NavItem {
  path: string
  text: string
}

const SecondaryNavBar: FC<{ navItems: NavItem[] }> = ({ navItems }) => {
  const navStyle = clsx(
    'no-underline hover:decoration-clementine hover:underline hover:underline-offset-8 hover:decoration-[0.2rem]',
  )
  return (
    <nav className="center sticky top-0 z-40 hidden bg-darkTeal py-2.5 md:block">
      <ul className="flex cursor-pointer flex-col flex-wrap items-center justify-center px-5 pb-2 pt-5 text-white md:flex-row md:space-x-8">
        {navItems.map((dataKey: { path: string; text: string }, i: number) => {
          return (
            <li key={i} className="pb-3 text-center">
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
