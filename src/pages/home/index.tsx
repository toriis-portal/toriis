import type { FC } from 'react'

import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import SecondaryNavBar from '../../components/Nav/SecondaryNavBar'
import SampleSection from '../../sections/SampleSection'

const Home: FC = () => {
  return (
    <>
      <SecondaryNavBar />
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
