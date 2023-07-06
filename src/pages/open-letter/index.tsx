import { PrimaryNavBar, SecondaryNavBar } from '../../components'
import { Letter, SignLetter, Signatories, Momentum } from '../../sections'

const LetterPage = () => {
  const navItems = [
    { path: 'openLetter', text: 'Open Letter' },
    { path: 'signLetter', text: 'Sign the Letter' },
    { path: 'signatories', text: 'Signatories' },
    { path: 'momentum', text: 'Continue the Momentum' },
  ]
  return (
    <>
      <PrimaryNavBar />
      <SecondaryNavBar navItems={navItems} />

      <div id="openLetter" className="pt-10">
        <Letter />
      </div>
      <div id="signLetter" className="pt-10">
        <SignLetter />
      </div>
      <div id="signatories" className="pt-10">
        <Signatories />
      </div>
      <div id="momentum" className="pt-10">
        <Momentum />
      </div>
    </>
  )
}

export default LetterPage
