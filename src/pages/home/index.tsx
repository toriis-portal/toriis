import type { FC } from 'react'

import OurRequest from '../../sections/OurRequests'
import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import SecondaryNavBar from '../../components/Nav/SecondaryNavBar'
import SampleSection from '../../sections/SampleSection'
import { ToTopButton } from '../../components'

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
      <main className="px-12">
        <div id="ourRequests" className="pt-20">
          <OurRequest />
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
        <ToTopButton />
      </main>
    </>
  )
}

export default Home
