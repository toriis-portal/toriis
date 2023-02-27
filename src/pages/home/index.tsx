import type { FC } from 'react'

import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import RefuteUISResponse from '../../sections/RefuteUISResponse'

const Home: FC = () => {
  return (
    <div className="space-y-8">
      <InstitutionalDivestments />
      <RefuteUISResponse />
      {/* TODO: remove later:  */}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default Home
