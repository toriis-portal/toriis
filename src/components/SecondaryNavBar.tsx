import type { FC } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'

import SampleSection from '../sections/SampleSection'

const NavBar: FC = () => {
  return (
    <>
      <nav className="navbar-fixed-top w-full justify-around bg-darkTeal px-2 py-2.5">
        <div className="container mx-auto flex flex-wrap">
          <div className="md:flex">
            <ul className="flex p-4 text-white md:space-x-8 md:text-sm ">
              <li>
                <Link
                  activeClass="active"
                  to="container1"
                  className="no-underline hover:underline"
                >
                  Our Requests
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="container2"
                  className="no-underline hover:underline"
                >
                  Institutional Divestment
                </Link>
              </li>
              <li>
                <Link to="container3" className="no-underline hover:underline">
                  Refute UIS Response
                </Link>
              </li>
              <li>
                <Link to="container4" className="no-underline hover:underline">
                  UIUC System
                </Link>
              </li>
              <li>
                <Link to="container5" className="no-underline hover:underline">
                  Divestment History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <SampleSection name="container1" text="Our Requests" />
      <SampleSection name="container2" text="Institutional Divestment" />
      <SampleSection name="container3" text="Refute UIS Response" />
      <SampleSection name="container4" text="UIUC System" />
      <SampleSection name="container5" text="Divestment History" />
      <a onClick={() => scroll.scrollToTop()}>To the top!</a>
    </>
  )
}

export default NavBar
