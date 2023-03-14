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
import type { TimelineEntry } from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const ourRequestsContent = await contentClient.get('request')
  const timelineContent = await contentClient.get('timeline').then((items) => (items as TimelineEntry[]).sort((a, b) => a.year - b.year))
  return {
    props: {
      ourRequestsContent,
      timelineContent,
    },
  }
}

interface HomeProps {
  ourRequestsContent: any,
  timelineContent: any,
}

const Home: FC<HomeProps> = ({ ourRequestsContent, timelineContent }) => {
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
          <OurRequest content={ourRequestsContent} />
        </div>
        <div id="institutionalDivestment" className="px-12 pt-20">
          <InstitutionalDivestments />
        </div>
        <div id="refuteUISReponse" className="pt-20">
          <RefuteUISResponse />
        </div>
        <div id="divestmentHistory" className="px-12 pt-20">
          <TimelineSection entries={timelineContent} />
        </div>

        <ToTopButton />
      </main>
    </>
  )
}

export default Home
