import type { FC } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'

import SampleSection from '../sections/SampleSection'

const NavBar: FC = () => {
  return (
    <>
      <nav className="sticky top-0 w-full justify-around bg-darkTeal px-2 py-2.5">
        <div className="container mx-auto flex flex-wrap">
          <div className="md:flex">
            <ul className="flex p-4 text-white md:space-x-8 md:text-sm ">
              <li>
                <Link
                  activeClass=""
                  to="container1"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="no-underline hover:underline hover:underline-offset-8"
                >
                  Our Requests
                </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="container2"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="no-underline hover:underline hover:underline-offset-8"
                >
                  Institutional Divestment
                </Link>
              </li>
              <li>
                <Link
                  to="container3"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="no-underline hover:underline hover:underline-offset-8"
                >
                  Refute UIS Response
                </Link>
              </li>
              <li>
                <Link
                  to="container4"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="no-underline hover:underline hover:underline-offset-8"
                >
                  UIUC System
                </Link>
              </li>
              <li>
                <Link
                  to="container5"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="no-underline hover:underline hover:underline-offset-8"
                >
                  Divestment History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="container1" className="pt-16">
        <SampleSection text="Our Requests" />
      </div>
      <div id="container2" className="pt-16">
        <SampleSection text="Institutional Divestment" />
      </div>
      <div id="container3" className="pt-16">
        <SampleSection text="Refute UIS Response" />
      </div>
      <div id="container4" className="pt-16">
        <SampleSection text="UIUC System" />
      </div>
      <div id="container5" className="pt-16">
        <SampleSection text="Divestment History" />
      </div>
      <a onClick={() => scroll.scrollToTop()}>To the top!</a>
    </>
  )
}

export default NavBar
