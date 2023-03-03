import type { FC } from 'react'

import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
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
      <main className="px-12">
        <div id="ourRequests" className="pt-20">
          <SampleSection text="Our Requests" />
        </div>
        <div id="institutionalDivestment" className="pt-20">
          <InstitutionalDivestments />
        </div>
        <div id="refuteUISReponse" className="pt-20">
          <SampleSection text="Refute UIS Response" />
        </div>
        <div id="UIUCSystem" className="pt-20">
          <SampleSection text="UIUC System" />
        </div>
        <div id="divestmentHistory" className="pt-20">
          <SampleSection text="Divestment History" />
        </div>
        <SampleSection text="" />
        <SampleSection text="" />
      </main>
    </>
  )
}

export default Home
