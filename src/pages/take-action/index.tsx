import type { FC } from 'react'
import { scroller } from 'react-scroll'

import { TakeActionPage } from '../../types'
import { PrimaryNavBar, SecondaryNavBar, ToTopButton } from '../../components'
import { ContentWrapper } from '../../utils/content'
import {
  Letter,
  LetterRequests,
  SignLetter,
  RespondingToPushback,
  Signatories,
  Momentum,
} from '../../sections'
import type {
  OurRequestsEntry,
  HomePageInfo,
  RefuteResponseEntry,
} from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()

  const takeActionEntries = await contentClient.getAllTakeActionEntries()
  const takeActionPageEntries = takeActionEntries['takeActionPage']

  const homeEntries = await contentClient.getAllHomePageEntries()
  const info = homeEntries['info']
  const ourRequestsEntries = homeEntries['request']
  const respondingToPushbackEntries = homeEntries['response']

  return {
    props: {
      info,
      takeActionPageEntries,
      ourRequestsEntries,
      respondingToPushbackEntries,
    },
  }
}

interface TakeActionPageProps {
  info: HomePageInfo
  takeActionPageEntries: TakeActionPage
  ourRequestsEntries: OurRequestsEntry[]
  respondingToPushbackEntries: RefuteResponseEntry[]
}

const TakeActionPage: FC<TakeActionPageProps> = ({
  info,
  takeActionPageEntries,
  ourRequestsEntries,
  respondingToPushbackEntries,
}) => {
  const navItems = [
    { path: 'openLetter', text: 'Open Letter' },
    { path: 'ourRequests', text: 'Our Requests' },
    { path: 'respondingToPushback', text: 'Responding to Pushback' },
    { path: 'signLetter', text: 'Sign the Letter' },
    // { path: 'signatories', text: 'Signatories' },
    // { path: 'momentum', text: 'Continue the Momentum' },
  ]
  return (
    <>
      <PrimaryNavBar />
      <ToTopButton />
      <SecondaryNavBar navItems={navItems} />

      <div id="openLetter" className="pt-10">
        <Letter
          openLetter={takeActionPageEntries.openLetter}
          scrollToForm={() =>
            scroller.scrollTo('signLetter', {
              smooth: true,
              duration: 500,
            })
          }
        />
      </div>
      <div id="ourRequests" className="pt-20">
        <LetterRequests entries={ourRequestsEntries} />
      </div>
      <div id="respondingToPushback" className="pt-20">
        <RespondingToPushback
          leftText={info.refuteUisResponse}
          entries={respondingToPushbackEntries}
        />
      </div>
      <div id="signLetter" className="pt-10">
        <SignLetter />
      </div>

      {/* 
      <div id="signatories" className="pt-10">
        <Signatories />
      </div>
      <div id="momentum" className="pt-10">
        <Momentum />
      </div> */}
    </>
  )
}

export default TakeActionPage
