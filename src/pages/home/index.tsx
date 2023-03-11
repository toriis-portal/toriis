import type { FC } from 'react'

import {
  Landing,
  OurRequest,
  InstitutionalDivestments,
  RefuteUISResponse,
  TimelineSection,
} from '../../sections'
import { ToTopButton, SecondaryNavBar } from '../../components'

const Home: FC = () => {
  const navItems = [
    { path: 'ourRequests', text: 'Our Requests' },
    { path: 'institutionalDivestment', text: 'Institutional Divestment' },
    { path: 'refuteUISReponse', text: 'Refute UIS Response' },
    { path: 'divestmentHistory', text: 'Divestment History' },
  ]

  return (
    <>
      <SecondaryNavBar navItems={navItems} />
      <Landing />
      <main>
        <div id="ourRequests" className="pt-20">
          <OurRequest />
        </div>
        <div id="institutionalDivestment" className="px-12 pt-20">
          <InstitutionalDivestments />
        </div>
        <div id="refuteUISReponse" className="pt-20">
          <RefuteUISResponse />
        </div>
        <div id="divestmentHistory" className="px-12 pt-20">
          <TimelineSection />
        </div>

        <ToTopButton />
      </main>
    </>
  )
}

export default Home
