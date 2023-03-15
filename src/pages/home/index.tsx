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
import type {
  Info,
  LinkEntry,
  ListEntry,
  OurRequestsEntry,
  RefuteResponseEntry,
  TimelineEntry,
} from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const info = await contentClient.get('info')
  const ourRequestsEntries = await contentClient.get('request')
  const timelineEntries = await contentClient.get('timeline')
  const divestmentLinkEntries = await contentClient.get('link')
  const divestmentListEntries = await contentClient.get('list')
  const refuteResponseEntries = await contentClient.get('response')
  return {
    props: {
      info,
      ourRequestsEntries,
      timelineEntries,
      divestmentListEntries,
      divestmentLinkEntries,
      refuteResponseEntries,
    },
  }
}

interface HomeProps {
  info: Info
  ourRequestsEntries: OurRequestsEntry[]
  timelineEntries: TimelineEntry[]
  divestmentListEntries: ListEntry[]
  divestmentLinkEntries: LinkEntry[]
  refuteResponseEntries: RefuteResponseEntry[]
}

const Home: FC<HomeProps> = ({
  info,
  ourRequestsEntries,
  timelineEntries,
  divestmentListEntries,
  divestmentLinkEntries,
  refuteResponseEntries,
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
      <Landing text={info.landing} />
      <main>
        <div id="ourRequests" className="pt-20">
          <OurRequest entries={ourRequestsEntries} />
        </div>
        <div id="institutionalDivestment" className="px-12 pt-20">
          <InstitutionalDivestments
            linkEntries={divestmentLinkEntries}
            listEntries={divestmentListEntries}
          />
        </div>
        <div id="refuteUISReponse" className="pt-20">
          <RefuteUISResponse
            leftText={info.refuteUisResponse}
            entries={refuteResponseEntries}
          />
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
