import type { FC } from 'react'

import {
  Landing,
  OurRequest,
  InstitutionalDivestment,
  RefuteUISResponse,
  AboutUs,
  TimelineSection,
} from '../../sections'
import {
  ToTopButton,
  SecondaryNavBar,
  PrimaryNavBar,
  Footer,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import type {
  HomePageInfo,
  LinkEntry,
  ListEntry,
  OurRequestsEntry,
  RefuteResponseEntry,
  TimelineEntry,
} from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()
  const homeEntries = await contentClient.getAllHomePageEntries()
  const info = homeEntries['info']
  const ourRequestsEntries = homeEntries['request']
  const timelineEntries = homeEntries['timeline']
  const divestmentLinkEntries = homeEntries['link']
  const divestmentListEntries = homeEntries['list']
  const refuteResponseEntries = homeEntries['response']
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
  info: HomePageInfo
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
    { path: 'refuteUISResponse', text: 'Refute UIS Response' },
    { path: 'aboutUs', text: 'About Us' },
    { path: 'divestmentHistory', text: 'Divestment History' },
  ]

  return (
    <>
      <PrimaryNavBar />
      <SecondaryNavBar navItems={navItems} />
      <Landing text={info.landing} />
      <main>
        <div id="ourRequests" className="pt-20">
          <OurRequest entries={ourRequestsEntries} />
        </div>
        <div id="institutionalDivestment" className="pt-20">
          <InstitutionalDivestment
            linkEntries={divestmentLinkEntries}
            listEntries={divestmentListEntries}
          />
        </div>
        <div id="refuteUISResponse" className="pt-20">
          <RefuteUISResponse
            leftText={info.refuteUisResponse}
            entries={refuteResponseEntries}
          />
        </div>
        <div id="aboutUs" className="pt-20">
          <AboutUs text={info.aboutUs} />
        </div>
        <div id="divestmentHistory" className="pt-20">
          <TimelineSection entries={timelineEntries} />
        </div>

        <ToTopButton />

        <Footer />
      </main>
    </>
  )
}

export default Home
