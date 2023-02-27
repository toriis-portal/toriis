import type { FC } from 'react'
import { Link } from 'react-scroll'
import clsx from 'clsx'

const SecondaryNavBar: FC = () => {
  const navStyle = clsx(
    'no-underline hover:text-clementine hover:underline hover:underline-offset-8',
  )
  return (
    <>
      <nav className="center sticky top-0 bg-darkTeal py-2.5">
        <ul className="flex flex-row items-center justify-center space-x-8 p-4 text-white">
          <li>
            <Link
              activeClass="active"
              to="ourRequests"
              spy={true}
              smooth={true}
              duration={500}
              className={navStyle}
            >
              Our Requests
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="institutionalDivestment"
              spy={true}
              smooth={true}
              duration={500}
              className={navStyle}
            >
              Institutional Divestment
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="refuteUISReponse"
              spy={true}
              smooth={true}
              duration={500}
              className={navStyle}
            >
              Refute UIS Response
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="UIUCSystem"
              spy={true}
              smooth={true}
              duration={500}
              className={navStyle}
            >
              UIUC System
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="divestmentHistory"
              spy={true}
              smooth={true}
              duration={500}
              className={navStyle}
            >
              Divestment History
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default SecondaryNavBar
