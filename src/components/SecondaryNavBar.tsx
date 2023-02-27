import type { FC } from 'react'
import { Link } from 'react-scroll'

import SampleSection from '../sections/SampleSection'

const SecondaryNavBar: FC = () => {
  return (
    <>
      <nav className="sticky top-0 justify-evenly bg-darkTeal py-2.5">
        <div className="container mx-auto md:flex">
          <ul className="flex cursor-pointer space-x-8 p-4 text-white">
            <li>
              <Link
                activeClass="active"
                to="container1"
                spy={true}
                smooth={true}
                duration={500}
                className="no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8"
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
                className="no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8"
              >
                Institutional Divestment
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="container3"
                spy={true}
                smooth={true}
                duration={500}
                className="no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8"
              >
                Refute UIS Response
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="container4"
                spy={true}
                smooth={true}
                duration={500}
                className="no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8"
              >
                UIUC System
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="container5"
                spy={true}
                smooth={true}
                duration={500}
                className="no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8"
              >
                Divestment History
              </Link>
            </li>
          </ul>
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
    </>
  )
}

export default SecondaryNavBar
