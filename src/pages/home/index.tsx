import type { FC } from 'react'

import InstitutionalDivestments from '../../sections/InstitutionalDivestments'
import Landing from '../../sections/Landing'

const Home: FC = () => {
  return (
    <div>
      <Landing />
      <InstitutionalDivestments />
    </div>
  )
}

export default Home
