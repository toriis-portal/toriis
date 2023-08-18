import type { FC } from 'react'
import { scroller } from 'react-scroll'

import { TakeActionPage } from '../../types'
import {
  PrimaryNavBar,
  SecondaryNavBar,
  ToTopButton,
  Footer,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import {
  Letter,
  LetterOurRequest,
  SignLetter,
  Signatories,
  Momentum,
} from '../../sections'
import type {
  OurRequestsEntry,
  HomePageInfo,
  ListEntryDocument,
} from '../../types'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()

  const takeActionEntries = await contentClient.getAllTakeActionEntries()
  const takeActionPageEntries = takeActionEntries['takeActionPage']
  const momentumEntries = takeActionEntries['continueTheMomentumEntries']

  const homeEntries = await contentClient.getAllHomePageEntries()
  const info = homeEntries['info']
  const ourRequestsEntries = homeEntries['request']

  return {
    props: {
      info,
      takeActionPageEntries,
      ourRequestsEntries,
      momentumEntries,
    },
  }
}

interface TakeActionPageProps {
  info: HomePageInfo
  takeActionPageEntries: TakeActionPage
  ourRequestsEntries: OurRequestsEntry[]
  momentumEntries: ListEntryDocument[]
}

const TakeActionPage: FC<TakeActionPageProps> = ({
  takeActionPageEntries,
  ourRequestsEntries,
  momentumEntries,
}) => {
  const navItems = [
    { path: 'openLetter', text: 'Open Letter' },
    { path: 'ourRequests', text: 'Our Requests' },
    { path: 'signLetter', text: 'Sign the Letter' },
    { path: 'signatories', text: 'Signatories' },
    { path: 'momentum', text: 'Continue the Momentum' },
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
        <LetterOurRequest entries={ourRequestsEntries} />
      </div>
      <div id="signLetter" className="pt-10">
        <SignLetter />
      </div>
      <div id="signatories" className="pt-10">
        <Signatories />
      </div>
      <div id="momentum" className="pt-10">
        <Momentum entries={momentumEntries} />
      </div>
      <Footer />
    </>
  )
}

export default TakeActionPage
