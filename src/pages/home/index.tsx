import type { FC } from 'react'

import ourRequests from '../../info/home.json'
import OurRequest from '../../sections/OurRequests'
import InstitutionalDivestments from '../../sections/InstitutionalDivestments'

const Home: FC = () => {
  return (
    <div>
      <InstitutionalDivestments />
      <OurRequest data={ourRequests.ourRequests} />
    </div>
  )
}

export default Home
