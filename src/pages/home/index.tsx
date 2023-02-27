import type { FC } from 'react'

import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import SecondaryNavBar from '../../components/SecondaryNavBar'
import SampleSection from '../../sections/SampleSection'

const Home: FC = () => {
  return (
    <div>
      <SecondaryNavBar />
      <div id="ourRequests" className="pt-32">
        <SampleSection text="Our Requests" />
      </div>
      <div id="institutionalDivestment" className="pt-32">
        <InstitutionalDivestments />
      </div>
      <div id="refuteUISReponse" className="pt-32">
        <SampleSection text="Refute UIS Response" />
      </div>
      <div id="UIUCSystem" className="pt-32">
        <SampleSection text="UIUC System" />
      </div>
      <div id="divestmentHistory" className="pt-32">
        <SampleSection text="Divestment History" />
      </div>
    </div>
  )
}

export default Home
