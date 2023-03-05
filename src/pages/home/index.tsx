import type { FC } from 'react'

import OurRequest from '../../sections/OurRequests'
import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import RefuteUISResponse from '../../sections/RefuteUISResponse'
import Landing from '../../sections/Landing'
import SecondaryNavBar from '../../components/Nav/SecondaryNavBar'
import SampleSection from '../../sections/SampleSection'

const Home: FC = () => {
  const data = {
    text: [
      { path: 'ourRequests', text: 'Our Requests' },
      { path: 'institutionalDivestment', text: 'Institutional Divestment' },
      { path: 'refuteUISReponse', text: 'Refute UIS Response' },
      { path: 'UIUCSystem', text: 'UIUC System' },
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
        <div id="UIUCSystem" className="px-12 pt-20">
          <SampleSection text="UIUC System" />
        </div>
        <div id="divestmentHistory" className="px-12 pt-20">
          <SampleSection text="Divestment History" />
        </div>
        <SampleSection text="" />
        <SampleSection text="" />
      </main>
    </>
  )
}

export default Home
