import type { FC } from 'react'

import { TakeActionPage } from '../../types'
import { PrimaryNavBar, SecondaryNavBar, ToTopButton } from '../../components'
import { ContentWrapper } from '../../utils/content'
import { Letter, SignLetter, Signatories, Momentum } from '../../sections'

export const getServerSideProps = async () => {
  const contentClient = new ContentWrapper()

  const takeActionEntries = await contentClient.getAllTakeActionEntries()
  const takeActionPageEntries = takeActionEntries['takeActionPage']

  return {
    props: {
      takeActionPageEntries,
    },
  }
}

interface TakeActionPageProps {
  takeActionPageEntries: TakeActionPage
}

const TakeActionPage: FC<TakeActionPageProps> = ({ takeActionPageEntries }) => {
  const navItems = [
    { path: 'openLetter', text: 'Open Letter' },
    // { path: 'signLetter', text: 'Sign the Letter' },
    // { path: 'signatories', text: 'Signatories' },
    // { path: 'momentum', text: 'Continue the Momentum' },
  ]
  return (
    <>
      <PrimaryNavBar />
      <ToTopButton />
      <SecondaryNavBar navItems={navItems} />

      <div id="openLetter" className="pt-10">
        <Letter openLetter={takeActionPageEntries.openLetter} />
      </div>
      {/* <div id="signLetter" className="pt-10">
        <SignLetter />
      </div>
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
