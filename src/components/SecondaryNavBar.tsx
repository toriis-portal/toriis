import type { FC } from 'react'
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from 'react-scroll'

import HomeData from '../info/home.json'

const NavBar: FC = () => {
  return (
    <>
      {/* <section id="Landing">Hello! This is {HomeData.example}</section> */}
      <nav className="fixed w-full justify-around bg-darkTeal px-2 py-2.5">
        <div className="container mx-auto flex flex-wrap">
          <div className="md:flex">
            <ul className="flex p-4 text-white md:space-x-8 md:text-sm ">
              <li>
                <a href="#" className="no-underline hover:underline">
                  Our Requests
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:underline">
                  Institutional Divestment
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:underline">
                  Refute UIS Response
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:underline">
                  UIUC System
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:underline">
                  Divestment History
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
