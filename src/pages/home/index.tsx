import type { FC } from 'react'

import {
  Landing,
  OurRequest,
  InstitutionalDivestments,
  RefuteUISResponse,
  TimelineSection,
} from '../../sections'
import { ToTopButton, SecondaryNavBar } from '../../components'
import { ContentWrapper } from '../../utils/content'
import type { LinkEntry, OurRequestEntry, TimelineEntry } from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const ourRequestsContent = await contentClient.get('request')
  const timelineEntries = await contentClient.get('timeline')
  const divestmentEntries = await contentClient.get('link')
  return {
    props: {
      ourRequestsContent,
      timelineEntries,
      divestmentEntries,
    },
  }
}

interface HomeProps {
  ourRequestsContent: OurRequestEntry[]
  timelineEntries: TimelineEntry[]
  divestmentEntries: LinkEntry[]
}

const Home: FC<HomeProps> = ({
  ourRequestsContent,
  timelineEntries,
  divestmentEntries,
}) => {
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
          <OurRequest entries={ourRequestsContent} />
        </div>
        <div id="institutionalDivestment" className="px-12 pt-20">
          <InstitutionalDivestments entries={divestmentEntries} />
        </div>
        <div id="refuteUISReponse" className="pt-20">
          <RefuteUISResponse />
        </div>
        <div id="divestmentHistory" className="px-12 pt-20">
          <TimelineSection entries={timelineEntries} />
        </div>

        <ToTopButton />
      </main>
    </>
  )
}

export default Home
