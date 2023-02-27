import type { FC } from 'react'
import { Link } from 'react-scroll'
import clsx from 'clsx'

import SampleSection from '../sections/SampleSection'
import data from '../info/home.json'

const SecondaryNavBar: FC = () => {
  return (
    <>
      <nav className="sticky top-0 justify-evenly bg-darkTeal py-2.5">
        <div className="container mx-auto md:flex">
          <ul className="flex cursor-pointer space-x-8 p-4 text-white">
            {data.secondaryNavText?.map((item: string, i: number) => (
              <li key={i}>
                <Link
                  key={i}
                  activeClass="active"
                  to="container1"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className={clsx(
                    'no-underline hover:text-[#FFA902] hover:underline hover:underline-offset-8',
                  )}
                >
                  {item}
                </Link>
              </li>
            ))}
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
