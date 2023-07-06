import { PrimaryNavBar, SecondaryNavBar } from '../../components'

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
        openLetter placeholder
      </div>
      <div id="signLetter" className="pt-10">
        signLetter placeholder
      </div>
      <div id="signatories" className="pt-10">
        signatories placeholder
      </div>
      <div id="momentum" className="pt-10">
        momentum placeholder
      </div>
    </>
  )
}

export default LetterPage
