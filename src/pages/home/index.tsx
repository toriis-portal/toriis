import type { FC } from 'react'

import OurRequest from '../../sections/OurRequests'
import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import RefuteUISResponse from '../../sections/RefuteUISResponse'
import Landing from '../../sections/Landing'
import SecondaryNavBar from '../../components/Nav/SecondaryNavBar'
import TimelineSection from '../../sections/Timeline'
import jsonData from '../../info/home.json'
import type { TimelineEntry } from '../../sections/Timeline'
import { ToTopButton } from '../../components'

const Home: FC = () => {
  const data = {
    text: [
      { path: 'ourRequests', text: 'Our Requests' },
      { path: 'institutionalDivestment', text: 'Institutional Divestment' },
      { path: 'refuteUISReponse', text: 'Refute UIS Response' },
      { path: 'divestmentHistory', text: 'Divestment History' },
    ],
  }

  return (
    <>
      <SecondaryNavBar data={data} />
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
          <TimelineSection
            text="Divestment History"
            data={jsonData.timeline as TimelineEntry[]}
          />
        </div>

        <ToTopButton />
      </main>
    </>
  )
}

export default Home
